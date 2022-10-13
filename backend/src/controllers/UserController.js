import { User } from '../models/User.js'
import bcrypt from 'bcryptjs';
import { generateToken } from '../helpers/generateToken.js';

class UserController {
    async create(req,res){
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(422).json({ error: 'Dados incorretos!' })
        }

        const userExists = await User.findOne({ email });

        if(userExists){
            return res.status(422).json({ error: 'Usuário já registrado!' });
        }

        const hashPassword = bcrypt.hashSync(password);

        try {
            const user = await User.create({ name, email, password: hashPassword });

            if(!user){
                return res.status(500).json('Erro na criação de usuário!');
            }
            const token = generateToken(user);

            return res.status(201).json({
                userId: user._id,
                userName: user.name,
                token
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal error!' })
        }

    }

    async login(req,res){
        try {
            const { email, password } = req.body;

            if(!email || !password){
                return res.status(422).json({ error: 'Dados incorretos!' })
            }

            const user = await User.findOne({ email });

            if(!user){
                return res.status(404).json({ error: 'Usuário não encontrado!' })
            } 

            const verifyPass = bcrypt.compareSync(password, user.password);
            if(!verifyPass){
                return res.status(422).json({ error: 'Dados incorretos!' })
            }

            const token = generateToken(user);

            return res.status(201).json({
                userId: user._id,
                userName: user.name,
                token 
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal error!' })
        }

    }

    async list(req,res){
        try {
            const users = await User.find({}).select('-password');

            if(!users){
                return res.json({ message: "Nenhum usuário encontrado" })
            }

            res.json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal error!' })
        }
        
    }

}

export default new UserController();