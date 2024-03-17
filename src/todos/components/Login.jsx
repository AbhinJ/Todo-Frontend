import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
export default function LoginComponent() {
  const [username, setUserName] = useState("admin");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleUserNameChange(e) {
    setUserName(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (authContext.login(username, password)) {
      setShowErrorMessage(false);
      navigate(`/welcome/${username}`);
    } else {
      setShowErrorMessage(true);
    }
  };

  const authContext = useAuth();
  return (
    <div>
      <div className="Login">
        <h1>Time to Login</h1>
        {showErrorMessage ? (
          <div className="errorMessage">
            Authentication Failed. Please check your credentials
          </div>
        ) : null}
        <form className="LoginForm" onSubmit={handleSubmit}>
          <div>
            <label> User Name</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleUserNameChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <input
              type="submit"
              name="login"
              value="Submit"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
