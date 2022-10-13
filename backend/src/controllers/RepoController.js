import { getToken } from "../helpers/getToken.js";
import { getUserByToken } from "../helpers/getUserByToken.js";
import { Repo } from "../models/Repo.js";
const regexUrl = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig

class RepoController {

    async reposUser(req,res){

        try {
            const token = await getToken(req);
            const user = await getUserByToken(token); 

            const { q } = req.query;

            if(!user){ 
                return res.status(404).json({ error: 'Usuário não encontrado!' })
            }

            let query = '';
            if(q){
                query = { url: { $regex: q } }
            }

            const repos = await Repo.find({
                userId: user._id,
                ...query
            });

            if(!repos){
                return res.status(404).json({ error: 'Repositório(s) não encontrado(s)!' })
            }

            return res.status(200).json(repos)

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal error!' })
        }

    }

    async create(req,res){
        try {
            const token = await getToken(req);
            const user = await getUserByToken(token); 
    
            const { url } = req.body;

            if(!url || !url.match(regexUrl)){
                return res.status(422).json({ error: 'Url incorreta!' })
            }

            const repoExists = await Repo.findOne({ 
                userId: user._id,
                url
            })

            if(repoExists){
                return res.status(422).json({ error: 'Esse repositório já existe!' })
            }

            const nameRepo = url.split('/')[4];

            if(!nameRepo){
                return res.status(422).json({ error: 'Url incorreta!' })
            }
            
            const newRepo = await Repo.create({ 
                name: nameRepo, 
                url,
                userId: user._id
            });

            return res.status(200).json(newRepo);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal error!' })
        }
       
    }

    async delete(req,res){
        try {
            const { id } = req.params;
            const token = await getToken(req);
            const user = await getUserByToken(token);

            const repoDelete = await Repo.findOne({ _id: id });

            if(!repoDelete){
                return res.status(404).json({ error: 'Repository not found!' }) 
            }

            if(!repoDelete.userId === user._id){
                return res.status(422).json({ error: 'you can only delete your repositories' })
            }

            await repoDelete.deleteOne();

            return res.status(200).json({
                message: 'Repositório deletado!'
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal error!' })
        }
        
    }

    async repoId(req,res){
        const { id } = req.params;
        const token = await getToken(req);
        const user = await getUserByToken(token);

        if(!user){
            return res.status(404).json({ error: 'Usuário não encontrado!' })
        }

        const repo = await Repo.findOne({
            userId: user._id,
            _id: id
        })

        return res.status(200).json(repo);

    }

    async update(req,res){
        try {
            const { id } = req.params;
            const { url } = req.body;
            const token = await getToken(req);
            const user = await getUserByToken(token);

            if(!url || !url.match(regexUrl)){
                return res.status(422).json({ error: 'Url incorreta!' })
            }

            const repoExists = await Repo.findOne({
                userId: user._id,
                url
            })

            if(repoExists){
                return res.status(422).json({ error: 'Este repositório já existe' })
            }

            const repoUpdated = await Repo.findOne({
                userId: user._id,
                _id: id
            })

            repoUpdated.url = url;

            const nameRepo = url.split('/')[4];

            if(!nameRepo){
                return res.status(422).json({ error: 'Url incorreta!' })
            }
            
            repoUpdated.name = nameRepo

            await repoUpdated.save();

            return res.status(200).json({
                message: 'Repositório atualizado!'
            });


        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal error!' })
        }  

    }

}

export default new RepoController();