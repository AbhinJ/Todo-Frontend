import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Logout from "./Logout";
import Footer from "./Footer";
import HeaderComponent from "./Header";
import ListTodos from "./ListTodos";
import Error from "./Error";
import Welcome from "./Welcome";
import Login from "./Login";
import "../css/TodoApp.css";
import AuthProvider, { useAuth } from "../security/AuthContext";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) return children;
  return <Navigate to="/login" />;
}

export default function TodoApp() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route
              path="/"
              element={
                <AuthenticatedRoute>
                  <Welcome />
                </AuthenticatedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <Welcome />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <ListTodos />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <Logout />
                </AuthenticatedRoute>
              }
            ></Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <Footer />
    </div>
  );
}
