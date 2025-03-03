import { useState } from 'react';
import { useAuth } from '../Firebase/firebaseContext';
import'../Styles/Login.css'

const Login = ({changeSection,finishedFun}) => {

    const { handleLogin } = useAuth();
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error,setError]=useState('');
        const [loading , setLoading]=useState(false);
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);
            try{
                await handleLogin(email, password );
                finishedFun(true);
            } catch(error) {
                setError(error.message);
            } finally{
                setLoading(false);
                setEmail('');
                setPassword('');
                // remove it later if there was a profile page
            }
        };



    return (
        <div className="logIn">
            
                <div className="container">
                    <div className="firstContainer">
                        <h1>Log Up</h1>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <input type="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                            <br />
                            <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                            <br />
                            {error && <p className="error">{error}</p>}
                            <button 
                            type="submit" 
                            className="submitButton"
                            disabled={loading}
                            >
                                {loading ? "Login..." : "Log In"}
                            </button>
                    </form>
                    </div>
                    <div className="secondContainer">
                        Dont have an account ? <p className="accountSection" onClick={()=>{changeSection("signUp")}}>Sign Up</p>
                    </div>
                </div>
        </div>
    )
}

export default Login
