import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Logout from './Logout';
import Footer from './Footer';
import HeaderComponent from './Header';
import ListTodos from './ListTodos';
import Error from './Error';
import Welcome from './Welcome';
import Login from './Login';
import '../css/TodoApp.css';

export default function TodoApp(){
    return (
        <div className="TodoApp">
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path='/' element={<Login />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/welcome/:username' element={<Welcome />}/>
                    <Route path='/todos' element={<ListTodos />}/>
                    <Route path = "/logout" element={<Logout/>}></Route>
                    <Route path='*' element={<Error />}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </div>
    )
}