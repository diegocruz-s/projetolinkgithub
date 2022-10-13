import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../models/User.js';

export const getUserByToken = async (token) => {
    const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);

    if(!verifyToken){
        return false;
    }

    const user = await User.findById(verifyToken.userId);

    if(!user){
        return false;
    }

    return user;

}