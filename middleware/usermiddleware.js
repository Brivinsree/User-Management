import { body, validationResult } from 'express-validator';

const validateUser = [
    body('name').notEmpty().withMessage('User Name Should not be Empty'),
    body('email').notEmpty().withMessage('Email Id Should not be Empty'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('phone_number').notEmpty().withMessage('Phone Number should not be Empty').isLength({ min: 10 }).isLength({ max: 10 }),
    body('phone_number').matches(/^[789]\d{9}$/).withMessage('Phone number must start with 7, 8, or 9 and be 10 digits long.'),

    (req, res, next) => {
        const errors = validationResult(req);
        const err_data = errors?.errors;
        if (err_data.length != 0) {
            const required_error_format = err_data.map((err) => ({
                field: err.path,
                message: err.msg
            }))
            return res.status(400).json({ message: "Validation Failed", errors: required_error_format })
        }
        next();
    }
];

export default validateUser;