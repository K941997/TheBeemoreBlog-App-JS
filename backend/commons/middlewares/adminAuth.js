const userModel = require('../../models/userModel');


const adminAuth = async (req, res, next) => {
    try {
        const user = await userModel.findOne({_id: req.user.id});

        if (user.role !== 1){
            return res.status(500).json({
                message: "Admin resources access denied"
            })
        }

        next();

    } catch(err) {
        return res.status(500).json(err.message); 
    }
}

module.exports = adminAuth;