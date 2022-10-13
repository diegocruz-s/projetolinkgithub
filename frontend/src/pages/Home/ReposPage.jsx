import './ReposPage.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { addRepo, getRepos } from '../../services/api';

const ReposPage = ({ repos, onDeleteRepo, onEditRepo })=>{

    return(
        <div className="reposUser">
            <p className='qtdRepo'>Qtd. de repositórios: <span>{repos.length}</span></p>
            {repos.length === 0 && (
                <p className='noRepo'>Sem repositórios...</p>
            )}
            {repos.map((repo) => (
                <div className="repo" key={repo._id}>

                    <div className="infosRepo">
                        <h2>{repo.name}</h2>
                        <a href={repo.url} target="_blank">{repo.url}</a>
                    </div>

                    <div className="deleteEditRepo">
                        <button className='btnDelete' onClick={() => onDeleteRepo(repo._id)}>X</button>
                        <button className='btnEdit' onClick={() => onEditRepo(repo._id)}>Editar</button>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default ReposPage;