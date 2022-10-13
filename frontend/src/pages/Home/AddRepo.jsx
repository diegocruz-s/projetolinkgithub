import './AddRepo.css';
import { useState } from "react";
import Message from "../../components/Message";

const AddRepo = ({ onNewRepo, error, loading })=>{

    const [urlNewRepo, setUrlNewRepo] = useState('');

    return(
        <div className="addRepo">
            <div className="newRepo">
                <label htmlFor="url">
                    <input 
                        type="url"
                        placeholder="https://xxx/xxx/xxx"
                        onChange={(e) => setUrlNewRepo(e.target.value)}
                        value={urlNewRepo || ''}
                    />
                </label>

                {loading ? (
                    <button disabled>Aguarde...</button>
                ) : (
                    <button onClick={() => {
                        onNewRepo(urlNewRepo);
                        setUrlNewRepo('');
                    }}>Criar</button>
                )}
            </div>

            {error && <Message msg={error} />}
        </div>
    )
}

export default AddRepo;