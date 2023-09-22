import conn from "../db/connect.js";
import { validationResult } from "express-validator";
import { createToken } from "../helpers/jwt.js";
const db = await conn();
const usuario = db.collection('usuario');

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);

        let result = await usuario.insertOne(req.body);
        result ? res.json({ message: "Usuario registrado con exito" }) : res.json({ message: 'Algo ha ocurrido' })
    } catch (error) {
        res.send(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);

        let result = await usuario.findOne({ email: req.body.email });
        if (!result || result === null) res.json({ message: "No se encuentra en la base de datos" })
        if (result.password === req.body.password) {
            let tokenUser = await createToken(req, res);
            res.cookie('token', tokenUser);
            res.json({ access: true, message: "Inicio de sesion exitoso" })
        } else res.json({ message: "Usuario o contraseña incorrectos" });
    } catch (error) {
        res.send('Ups, error')
        throw new Error(error)
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token')
    res.json({ message: 'User successfully logged out' })
}

export const authController = {
    registerUser,
    loginUser,
    logoutUser
}