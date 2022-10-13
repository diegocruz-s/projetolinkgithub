import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const checkAuth = async (req,res,next) => {
    if(!req.headers.authorization){
        return res.status(401).json({ error: 'Token invalid!' })
    }

    const token = await req.headers.authorization.split(' ')[1];

    try {
        
        const verifyToken = await jwt.verify(token, process.env.TOKEN_SECRET);

        req.userId = verifyToken.userId;

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal error!!' });
    }

}