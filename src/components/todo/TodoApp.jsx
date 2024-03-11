import { useState } from 'react';
import './TodoApp.css';

export default function TodoApp(){
    return (
        <div className="TodoApp">
            Todo Management Application
            <LoginComponent/>
        </div>
    )
}

function LoginComponent(){
    
    const [username, setUserName] = useState("admin");
    const [password, setPassword] = useState("");
    
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
    function handleUserNameChange(e){
        setUserName(e.target.value);
    }

    return(
        <div>
            <div className="Login">
                <div className="LoginForm">
                    <div>
                        <label> User Name</label>
                        <input type="text" name="username" value={username} onChange={handleUserNameChange}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="text" name="password" value = {password} onChange={handlePasswordChange}/>
                    </div>
                    <div>
                        <input type="submit" name="login" value="Submit"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

function WelcomeComponent(){
    return(
        <div>
            <div className="Welcome">
                Welcome Component
            </div>
        </div>
    )
}