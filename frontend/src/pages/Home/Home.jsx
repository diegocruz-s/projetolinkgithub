import { useEffect } from "react";
import { useState } from "react";
import Message from "../../components/Message";
import { getRepos, addRepo, deleteRepo, repoId, updateRepo } from "../../services/api";
import AddRepo from "./AddRepo";
import EditRepo from "./EditRepo";
import Navbar from "./Navbar";
import ReposPage from "./ReposPage";
import Search from "./Search";


const Home = () => {

    const [repos, setRepos] = useState([]);
    const [repo, setRepo] = useState(null);
    const [errorUrl, setErrorUrl] = useState(null);
    const [loadingPage, setLoadingPage] = useState(true);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [checkUpdate, setCheckUpdate] = useState(false);

    useEffect(()=>{
        (async ()=>{
            await allRepos();
        })()
    }, []);

    const allRepos = async () => {
        const responseRepos = await getRepos();
        setRepos(responseRepos);
        setLoadingPage(false);
    }

    const handleNewRepo = async (urlNewRepo) => {            
        setLoadingCreate(true);   

        try {
            setErrorUrl(null);
            await addRepo(urlNewRepo);
            const responseRepos = await getRepos();
            setRepos(responseRepos);
        } catch (error) {
            setErrorUrl(error.response.data.error);
            console.log(error.response.data.error);
        }

        setLoadingCreate(false);

    }

    const handleDeleteRepo = async (id) => {
        try {
            await deleteRepo(id);
            const responseRepos = await getRepos();
            setRepos(responseRepos);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditRepo = async (id) => {
        setRepo(null);
        const repo = await repoId(id);
        setRepo(repo);
    }

    const handleSearch = async (e, query) => {
        if(e){
            e.preventDefault();
        }

        if(!query){
            return;       
        }

        const responseRepos = await getRepos(query);
        setRepos(responseRepos);
    }

    const handleUpdate = async (e, urlRepo, repoId)=>{
        e.preventDefault();
        setCheckUpdate(null);

        const res = await updateRepo(urlRepo, repoId);

        const responseRepos = await getRepos();
        setRepos(responseRepos);

        setCheckUpdate(res.message);

        setRepo(null);

    }

    if(loadingPage){
        return <p>Carregando...</p>
    }

    return(
        <div id="home">

            {/* navbar */}
            <Navbar />
            {/* search */}
            <Search onSearch={handleSearch} allRepos={allRepos} />
            {checkUpdate && (
                <Message msg={checkUpdate} />
            )}
            {/* repos */}
            <ReposPage repos={repos} onDeleteRepo={handleDeleteRepo} onEditRepo={handleEditRepo} />
            {/* add repo */}
            <AddRepo onNewRepo={handleNewRepo} error={errorUrl} loading={loadingCreate} />
            {repo && (
                <EditRepo repo={repo} onRepoUpdate={handleUpdate} />
            )}  

        </div>
    )
}

export default Home;