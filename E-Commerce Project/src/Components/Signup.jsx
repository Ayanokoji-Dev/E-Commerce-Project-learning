import { useState } from "react";
import { useAuth } from "../Firebase/firebaseContext";
import "../Styles/Signup.css"

const Signup = ({changeSection,finishedFun}) => {

    const { handleSignUp } = useAuth();
    const [username,setUsername]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError]=useState('');
    const [loading , setLoading]=useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try{
            await handleSignUp(email, password , username);
            finishedFun(true);
        } catch(error) {
            setError(error.message);
        } finally{
            setLoading(false);
            setEmail('');
            setPassword('');
            setUsername('');
            // remove it later if there was a profile page
        }
    };
    return (
        <div className="signUp">
            <div className="container">
                <div className="firstContainer">
                    <h1>Sign Up</h1>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Your Name" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                        <br />
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
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>
                </div>
                <div className="secondContainer">
                    Already Have an account ? <p className="accountSection" onClick={()=>{changeSection("logIn")}}>Log In</p>
                </div>
            </div>
        </div>
    )
}

export default Signup
