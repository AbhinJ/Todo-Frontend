import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginComponent(){
    
    const [username, setUserName] = useState("admin");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
    function handleUserNameChange(e){
        setUserName(e.target.value);
    }
    function handleAuthentication(){
        setIsAuthenticated(true);
    }

    function handleSubmit(){
        if(username === "admin" && password === "123456789"){
            setShowSuccessMessage(true);
            setShowErrorMessage(false);
            navigate(`/welcome/${username}`);
        }
        else{
            setShowErrorMessage(true);
            setShowSuccessMessage(false);
        }
    }
    return(
        <div>
            <div className="Login">
                <h1>Time to Login</h1>
                {showSuccessMessage ? <div className="successMessage">Authenticated Successfully</div> : null}
                {showErrorMessage ? <div className="errorMessage">Authentication Failed. Please check your credentials</div> : null}
                <div className="LoginForm">
                    <div>
                        <label> User Name</label>
                        <input type="text" name="username" value={username} onChange={handleUserNameChange}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" value = {password} onChange={handlePasswordChange}/>
                    </div>
                    <div>
                        <input type="submit" name="login" value="Submit" onClick={handleSubmit}/>
                    </div>
                </div>
            </div>
        </div>
    )
}