import './EditRepo.css'
import { useEffect } from "react";
import { useState } from "react";

const EditRepo = ({ repo, onRepoUpdate })=>{

    const [newUrl, setNewUrl] = useState('');
    const [showEdit, setShowEdit] = useState(true);

    useEffect(()=>{
        if(repo){
            setNewUrl(repo.url);
        }
    }, [repo])

    return(
        <>
            {(repo && showEdit) && (
                <div className="repoId">
                    <div className="contentEdit">
                        <form onSubmit={(e) => onRepoUpdate(e, newUrl, repo._id)}>
                            <input 
                                type="url"
                                placeholder="https://xxx/xxx/xxx"
                                onChange={(e) => setNewUrl(e.target.value)}
                                value={newUrl || ''}
                            />
                            <input type="submit" value='Atualizar' />
                        </form>
                        <button onClick={() => setShowEdit(false)}>X</button>
                    </div>
                </div>
            )}
        </>
        
    )
}

export default EditRepo;