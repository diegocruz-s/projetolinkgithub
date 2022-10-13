import './Navbar.css';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {

    const { logout } = useContext(AuthContext);

    return(
        <nav id="navbar">
            <div className="gitReposTitle">
                <h1>Repos GitHub</h1>
            </div>

            <div className="logout">
                <button onClick={logout}>Sair</button>
            </div>
        </nav>
    )
}

export default Navbar;