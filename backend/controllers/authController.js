const userModel = require("../models/userModel");
const postModel = require('../models/postModel');
const bcrypt = require('bcrypt'); //bcrypt password
const tokenJWT = require("../commons/tokenJWT"); //token JWT
require('dotenv').config();

const _ = require('lodash') //npm i lodash
// const fetch = require('node-fetch'); //npm i node-fetch không cần thiết vì nodejs v12 đã hỗ trợ
const {validationResult} = require('express-validator'); //npm i express-validator
const {errorHandler} = require('../commons/errorHandling') //Custom errorHandler

const sendMailByGoogle = require('../commons/sendMailByGoogle'); //Send Email by ConsoleCloudGoogle (Not Working)
// const sendMailBySendgrid = require('@sendgrid/mail'); //npm i @sendgrid/mail //Send Email by Sendgrid (Working)
const sendMailBySendgrid = require('../commons/sendMailBySendGrid');
const sendSMSByTwilio = require('../commons/sendSMSByTwilio');

const {validateEmail, validatePhone} = require ('../commons/middlewares/authValidate')

const jwt = require('jsonwebtoken');

//Cookie - Dùng ở index.js:
// const Cookies = require('js-cookie') //npm i js-cookie
// var cookieParser = require('cookie-parser');
// app.use(cookieParser())



//!Register:
const registerUser = async(req, res) => {
    const {username, account, password} = req.body; //nhập trên api Postman
    // const errors = validationResult(req);

    try {
        //check user:
        const existedUsername = await userModel.findOne({ username } );
        const existedAccount = await userModel.findOne({ account } );

        if (existedUsername || existedAccount ) {
            return res.status(400).json({message: "Register username or account failed"});
        } 
        else {
            //bcrypt password:
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            //register create to MongoDB:
            const newUser = await userModel.create({
                username,
                account,
                password: hashPassword,
            })

            //tokenJWT:
            const active_token = tokenJWT.generateActiveToken({newUser});

           
            if(validateEmail(account)){
                //! Send Email by Sendgrid (Working):
                const url = `${process.env.CLIENT_URL}/users/activate/${active_token}` //client

                sendMailBySendgrid(account, url, "Verify your email");

                return res.json({
                    message: `Success! Please check your email ${account}`,
                    data: newUser,
                    active_token,
                })

            } else if (validatePhone(account)){
                //! Send SMS by Twilio:
                const url = `${process.env.CLIENT_URL}/users/activate/${active_token}` //client

                sendSMSByTwilio(account, url, "Verify your phone number");

                return res.json({
                    message: `Success! Please check your phone ${account}`,
                    data: newUser,
                    active_token,
                })
            }
                            
        }

    } catch (err) {
        res.status(500).json(err.message)
    }
}


//!Active Account + ErrorHandler:
const activeAccount = async(req, res) => {
    try {
        const {active_token} = req.body; //nhập trên API Postman

        let decodedData;

        decodedData = jwt.verify(active_token, process.env.ACTIVE_TOKEN_JWT_KEY);

        const {newUser} = decodedData;
        if (!newUser) {
            return res.status(400).json(
                {message: "Invalid authentication"}
            )   
        }

        const user = new userModel(newUser)
        
        res.json({
            message: "Account has been activated!",
            data: user,
        })

    } catch(err) {
        // let errMsg;
        
        // if (err.code === 11000) {
        //     errMsg = Object.keys(err.keyValue)[0] + "already exists"
        // } else {
        //     let name = Object.keys(err.errors)[0]
        //     errMsg = err.errors[`${name}`].message
        // }

        return res.status(500).json(err.message)
    }
} 



//!Login:
const loginUser = async(req, res) => {
    const {account, password} = req.body; //nhập trên api Postman
    
    try {
        //check:
        const user = await userModel.findOne({account});
        if (!user) {
            return res.status(400).json({message: "Account doesn't exist"});
        }

        //compare bcrypt password:
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid password"});
        }

        //tokenJWT:
        const access_token = tokenJWT.generateAccessToken({id: user._id})
        const refresh_token = tokenJWT.generateRefreshToken({id: user._id})

     
        res.cookie("refreshtoken", refresh_token, {
            httpOnly: true,
            path: `/api/auth/refresh_token`, //api Postman after Login
            maxAge: 30*24*60*60*1000, //30 days
            
        }) 

        res.status(200).json({
            message: "Login Successfully",
            user,
            access_token,
            refresh_token
            
        })

    } catch(err) {
        res.status(500).json(err.message);
    }
}


//!Logout:
const logoutUser = async(req, res) => {
    try {
        res.clearCookie("refreshtoken", {
            path: `/api/auth/refresh_token`,
        })

        return res.json({message: "Logged Out!"});

    } catch(err) {
        return res.status(500).json(err.message);
    }
}



//!RefreshToken + CookieParser ở index.js:
const refreshTokenUser = async(req, res) => {
    try {
        const rf_token = await req.cookies.refreshtoken
        if(!rf_token) {
            return res.status(400).json({
                message: "Please Login now!"
            })
        }

        const decoded = jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_JWT_KEY}`);
        if(!decoded.id) {
            return res.status(400).json({
                message: "Please Login now!"
            })
        }

        const user = await userModel.findById(decoded.id).select("-password")
        if(!user) {
            return res.status(400).json({
                message: "This account doesn't exist!"
            })
        }

        const access_token = tokenJWT.generateAccessToken({id: user._id});

        res.json({
           message: "Refresh Success!",
           access_token,
           user,
        })
    } catch(err) {
        res.status(500).json(err.message);
    }
}


//!Forgot Password:
const forgotPassword = async(req, res) => {
    try{
        const {account} = req.body;

        const user = await userModel.findOne({account});
        if(!user) {
            return res.status(400).json({
                message: "This account doesn't exist"
            })
        }

        const access_token = tokenJWT.generateAccessToken({id: user._id});


        if(validateEmail(account)){
            //! Send Email by Sendgrid (Working):
            const url = `${process.env.CLIENT_URL}/users/reset/${access_token}` //client

            sendMailBySendgrid(account, url, "Reset your password");

            return res.json({
                message: `Resend the password, please check your email`,
                data: user,
                access_token,
            })

        } else if (validatePhone(account)){
            //! Send SMS by Twilio:
            const url = `${process.env.CLIENT_URL}/users/reset/${access_token}` //client

            sendSMSByTwilio(account, url, "Reset your password");

            return res.json({
                message: `Resend the password, please check your phone`,
                data: user,
                access_token,
            })
        }

    } catch(err) {
        return res.status(500).json(err.message)
    }
}


//!Reset Password:
const resetPassword = async(req, res) => {
    try {
        const {password} = req.body;
        console.log(password);

        const hashPassword = await bcrypt.hash(password, 12);


        await userModel.findOneAndUpdate({_id: req.user.id}, {
            password: hashPassword,
        })

        res.json({message: "Password Successfully Changed"})

    } catch(err) {
        return res.status(500).json(err.message)
    }
}


//!Get User Info:
const getUserInfo = async(req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        

        res.status(200).json(user);
    } catch(err) {
        return res.status(500).json(err.message);
    }
}


//!Get User All Info: (Admin)
const getAllUsersInfo = async(req, res) => {
    try {
        const users = await userModel.find().select('-password');

        res.json(users);

    } catch(err) {
        return res.status(500).json(err.message);
    }
}


//!Update User:
const updateUser = async(req, res) => {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);

            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await userModel.findOneAndUpdate(
                {_id: req.params.id}, 
                {$set: req.body}, 
                {new: true}
            );

            res.status(200).json({
                message: "Update Successfully",
                data: updatedUser,
            });

        } catch (err) {
            res.status(500).json(err.message)
        }
}


//!Update User Role: (Admin)
const updateUserRole = async(req, res) => {
    if(req.body.password) {
        const salt = await bcrypt.genSalt(10);

        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
        const {role} = req.body; //nhập vào postman

        const updatedUser = await userModel.findOneAndUpdate(
            {_id: req.params.id},
            {role},
            {new: true}
        );

        res.status(200).json({
            message: "Update Role Successfully",
            data: updatedUser
        });

    } catch (err) {
        res.status(500).json(err.message)
    }
}


//!Delete User (Admin):
const deleteUser = async(req, res) => {
 
        try {
            const existedUser = await userModel.findById(req.params.id);
            if (!existedUser) {
                return res.status(400).json("User not found");
            }

            try {
                await postModel.deleteMany({username: existedUser.username}); //Xóa cả các post đi kèm user

                await userModel.findByIdAndDelete(req.params.id);
     
                res.status(200).json("User has been deleted");

            } catch (err) {
                res.status(500).json(err.message)
            }
        } catch(err) {
            res.status(500).json(err.message)
        }
       
}

//export:
module.exports = {
    registerUser, 
    activeAccount,
    loginUser,
    logoutUser,
    refreshTokenUser,
    forgotPassword,
    resetPassword,
    getUserInfo,
    getAllUsersInfo,
    updateUser,
    updateUserRole,
    deleteUser
};