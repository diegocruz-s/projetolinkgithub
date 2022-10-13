import './Auth.css'
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import { NavLink } from 'react-router-dom'

const Auth = () => {

    const { login, auth } = useContext(AuthContext);
    const [formLogin, setFormLogin] = useState(true);
    const [formRegister, setFormRegister] = useState(false);

    const handleFormLogin = () => {
        setFormLogin(true);
        setFormRegister(false);
    }

    const handleFormRegister = () => {
        setFormLogin(false);
        setFormRegister(true);
    }

    return(
        <div id="auth">
            
            <div className="optionsForm">
                <button onClick={handleFormLogin} className={`${formLogin ? 'showFormButton' : ''} chooseForm`}>Entrar</button>
                <button onClick={handleFormRegister} className={`${formRegister ? 'showFormButton' : ''} chooseForm`}>Cadastrar</button>
            </div>

            <div className="formAuth">
                {formLogin ? (
                    <FormLogin />
                ) : (
                    <FormRegister />
                )}
            </div>


        </div>
    )
}

export default Auth;