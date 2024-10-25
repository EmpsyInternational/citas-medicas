const { authentication, registerUser, getCitas, getLeads } = require('../models/toolsModel');

const controller = {};

controller.authentication = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    
    try {
        const authResponse = await authentication({ email, password });
        return res.status(authResponse.code).json({ message: authResponse.message });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: error.message });
    }
}

controller.registerUser = async (req, res) => {
    const { first_name, last_name, email, password, ciudad, telefono } = req.body;
    console.log(req.body);
    
    try {
        const registerResponse = await registerUser({ first_name, last_name, email, password, ciudad, telefono });
        return res.status(registerResponse.code).json({ message: registerResponse.message });
    } catch (err) {
        console.log(err); 
        return res.status(500).json({ message: err.message });
    }
}

controller.getCitas = async (req, res) => {
    try {
        const response = await getCitas();
        if (response.status) {
            res.status(200).json({
                message: response.message,
                data: response.data
            });
        } else {
            res.status(409).json({
                message: response.message
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

controller.getLeads = async (req, res) => {
    try {
        const response = await getLeads();
        if (response.status) {
            res.status(200).json({
                message: response.message,
                data: response.data
            });
        } else {
            res.status(409).json({
                message: response.message
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

module.exports = controller;
