import { body } from 'express-validator'

export const userDTO = [
    body('email').notEmpty().isString().matches("^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$").withMessage('email is required and must be a valid email'),
    body('password').notEmpty().isString().withMessage('password is required and must be a string'),
]