import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (user) => {
    const token = jwt.sign({
        userId: user._id
    }, process.env.TOKEN_SECRET, {
        expiresIn: '7d'
    })
 
    return token
}