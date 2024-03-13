import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate, useParams} from 'react-router-dom'; 
import './TodoApp.css';

export default function TodoApp(){
    return (
        <div className="TodoApp">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginComponent />}/>
                    <Route path='/login' element={<LoginComponent />}/>
                    <Route path='/welcome/:username' element={<WelcomeComponent />}/>
                    <Route path='/todos' element={<ListTodosComponent />}/>
                    <Route path='*' element={<ErrorComponent />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

function LoginComponent(){
    
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

function WelcomeComponent(){
    const params = useParams();
    return(
        <div className="Welcome">
            <h1>Welcome {params.username}</h1>
            <div>
                Manage Your Todos <Link to='/todos'>Go here</Link>
            </div>
        </div>
    )
}

function ErrorComponent(){
    return(
        <div>
            <div className="ErrorComponent">
                <h1>We are really working very hard!!</h1>
                <div>
                    Apologies for the 404.
                </div>
            </div>
        </div>
    )
}

function ListTodosComponent(){

    const today = new Date();
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay());

    const todos = [
        {id:1, description: 'Learn AWS', done: false, targetDate}, 
        {id: 2, description: 'Learn Full Stack Development', done: false, targetDate},
        {id: 3, description: 'Learn Azure', done: false, targetDate}
    ];
    return(
        <div>
            <div className="ListTodosComponent">
                <h1>Things you want to do</h1>
                <table>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>Description</td>
                            <td>Is Done?</td>
                            <td>Target Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                (todo) => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toDateString()}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}