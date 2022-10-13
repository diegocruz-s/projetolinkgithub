import { useContext } from "react";
import { useState } from "react";
import Message from "../../components/Message";
import { AuthContext } from "../../context/AuthContext";

const FormRegister = () => { 
    
    const { register, loading, error } = useContext(AuthContext);

    const [name, setName] = useState('');
    const[email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            name, email, password
        }

        register(newUser);

    }

    return(
        <div className="divForm divFormRegister">

            <form onSubmit={handleRegister} className='form formRegister'>

                <label htmlFor="name">
                    <input 
                        type="text"
                        placeholder="Nome"   
                        onChange={(e) => setName(e.target.value)}
                        value={name || ''}  
                        required
                    />
                </label>

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
                    <input type="submit" value='Cadastrar' />
                )}
            </form>
            {error && <Message msg={error} />}
        </div>
    )
}

export default FormRegister;