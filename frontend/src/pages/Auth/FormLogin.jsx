import { useState } from "react";
import { useContext } from "react";
import Message from "../../components/Message";
import { AuthContext } from "../../context/AuthContext";

const FormLogin = () => {   
    
    const { login, loading, error } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e)=>{
        e.preventDefault();

        login(email, password);

        setEmail('');
        setPassword('');
    }

    return(
        <div className="divForm divFormLogin">

            <form onSubmit={handleLogin} className='form formLogin'>

                <label htmlFor="email">
                    <input 
                        type="email"
                        placeholder="E-mail"   
                        onChange={(e) => setEmail(e.target.value)}
                        value={email || ''}  
                        required
                    />
                </label>

                <label htmlFor="password">
                    <input 
                        type="password"
                        placeholder="Senha"   
                        onChange={(e) => setPassword(e.target.value)}
                        value={password || ''}  
                        required
                    />  
                </label>

                {loading ? (
                    <input type="submit" value='Aguarde...' disabled />
                ) : (
                    <input type="submit" value='Entrar' />
                )}

            </form>
            {error && <Message msg={error} />}
        </div>
    )
}

export default FormLogin;