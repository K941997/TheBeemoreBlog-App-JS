const validateRegister = async(req, res, next) => {
    const { username, account, password } = req.body;

    if (!username) {
        return res.status(400).json({message: "Please add your username"});
    } else if (username.length > 20) {
        return res.status(400).json({message: "Your name is up to 20 chars"});
    }

    if (!account) {
        return res.status(400).json({message: "Please add your email or phone"});
    } else if (!validatePhone(account) && !validateEmail(account)) {
        return res.status(400).json({message: "Email or Phone format is incorrect"});
    }

    if (password.length < 6) {
        return res.status(400).json({message: "Password must be at least 6 chars"});
    }

    next();
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

const validatePhone = (phone) => {
    const re = /^[+]/g;
    return re.test(phone);
}


module.exports = {
    validateRegister,
    validateEmail,
    validatePhone,
};