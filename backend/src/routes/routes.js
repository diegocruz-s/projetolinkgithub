import express from 'express';
import UserRoutes from '../routes/UserRoutes.js';
import RepoRoutes from '../routes/RepoRoutes.js';
const app = express();

app.get('/test', (req,res)=>{
    res.json('Ok test')
})

app.use('/users', UserRoutes);
app.use('/repos', RepoRoutes);

export default app;

