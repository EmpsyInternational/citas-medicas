require('dotenv').config();

const PORT = process.env.PORT

const USER = process.env.USER
const NAME = process.env.NAME
const PASS = process.env.PASS
const HOST = process.env.HOST

const KEY = process.env.KEY

const LOGIN = process.env.LOGIN
const REGISTER = process.env.REGISTER
const CITAS = process.env.CITAS
const LEADS = process.env.LEADS

module.exports = {
    PORT,USER,NAME,PASS,HOST,KEY,LOGIN,REGISTER,LEADS,CITAS
}