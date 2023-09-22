import conn from "../db/connect.js";
import { SignJWT, jwtVerify } from "jose"
import { ObjectId } from "mongodb";
import { config } from "dotenv";
config();

const db = await conn();
const usuario = db.collection("usuario")

export const createToken = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) return res.status(400).send({ message: "Datos no enviados" });

        const result = await usuario.findOne({ $or: [{ user: req.body.user }, { email: req.body.user }] });
        if (!result) return res.status(401).send({ message: "User not found" });

        const id = result._id.toString();
        const jwtConstructor = await new SignJWT({ id: id })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('3h')
            .sign(new TextEncoder().encode(process.env.JWT_PRIVATE_KEY));
        req.data = { status: 200, message: jwtConstructor };
        return req.data.message;
    } catch (error) {
        res.send(error)
    }
}

export const tokenVerification = async (req, res, next) => {
    try {
        const jwtData = await jwtVerify(
            req.cookies.token,
            new TextEncoder().encode(process.env.JWT_PRIVATE_KEY)
        );
        let result = await usuario.findOne({ _id: new ObjectId(jwtData.payload.id) });
        if (!result) res.json({ message: 'Error' });
        req.user = result;
        next();
    } catch (error) {
        res.send(error)
    }
}