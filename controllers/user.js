
const { userModel, validateLogin, validateRegistration } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const getUsers = async (req, res) => {
    try {

        const records = userModel.find()
        if (!records) res.status(400).send('no data..')
        res.send(records)

    } catch (error) {
        res.send({ msg: error })
    }
}

const GetUserById = (req, res) => {

}

const login = async (req, res) => {

    try {

        const { error } = validateLogin(req.body);
        if (error) res.send.status(400).send(error.details[0].message)

        const user = await userModel.findOne({ email: req.body.email });
        if (!user) res.status(400).send('invalid Email or password');

        const validPassword = bcrypt.compare('fuck',req.body.password, user.password);
        if (!validPassword) res.status(400).send('invalid password');

        const token = jwt.sign({_id:user._id},"jwtPrivateKey")
        console.log(token)
        res.send(token)
    } catch (err) {

    }

}

const signup = async (req, res) => {
    try {

        const {error} = validateRegistration(req.body)
        if (error) {res.status(400).send(error.details[0].message)}

        var record = new userModel(req.body);
        if (!record) res.status(400).send("error")

        const salt = await bcrypt.genSalt(10);
        record.password = await bcrypt.hash(record.password, salt)
        await record.save();
        
        const token = jwt.sign({_id:record.id},"jwtPrivateKey")
        res.header('x-auth-token',token).send({ Id: record.id, email: record.email, firstName: record.firstName, lastname: record.lastName })



    } catch (error) {
        res.send(error)
    }
}

module.exports = { getUsers, GetUserById, login, signup }
