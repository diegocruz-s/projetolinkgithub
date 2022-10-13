import './Search.css';
import { useState } from "react";

const Search = ({ onSearch, allRepos }) => {

    const [query, setQuery] = useState('');

    return(
        <div className="divSearch">

            <form onSubmit={(e) => onSearch(e, query)} className="search">
                <input 
                    type="text"
                    placeholder="Pesquisar"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query || ''}
                />

            </form>

            <button onClick={() => {
                onSearch(null, query)
                setQuery('');    
            }}>
                V
            </button>

            <button onClick={() => {
                allRepos()
                setQuery('');    
            }}>
                Limpar
            </button>
            
        </div>
        
    )
}

export default Search;