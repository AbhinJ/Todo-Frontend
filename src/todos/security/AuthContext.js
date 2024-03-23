import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/TodoApiService";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  // function login(username, password) {
  //   if (username === "admin" && password === "123456789") {
  //     setAuthenticated(true);
  //     setUsername(username);
  //     return true;
  //   } else {
  //     setAuthenticated(false);
  //     setUsername(null);
  //     return false;
  //   }
  // }

  // async function login(username, password) {
  //   const baToken = "Basic " + window.btoa(username + ":" + password);
  //   try {
  //     const response = await executeBasicAuthenticationService(baToken);
  //     if (response.status === 200) {
  //       setAuthenticated(true);
  //       setUsername(username);
  //       setToken(baToken);
  //       apiClient.interceptors.request.use((config) => {
  //         console.log("Intercepting and adding a token");
  //         config.headers.Authorization = baToken;
  //         return config;
  //       });
  //       return true;
  //     } else {
  //       logout();
  //       return false;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     logout();
  //     return false;
  //   }
  // }
  async function login(username, password) {
    try {
      const response = await executeJwtAuthenticationService(
        username,
        password
      );
      if (response.status === 200) {
        setAuthenticated(true);
        setUsername(username);
        const jwtToken = "Bearer " + response.data.token;
        setToken(jwtToken);
        apiClient.interceptors.request.use((config) => {
          console.log("Intercepting and adding a token");
          config.headers.Authorization = jwtToken;
          return config;
        });
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.log(error);
      logout();
      return false;
    }
  }
  function logout() {
    setAuthenticated(false);
    setUsername(null);
    setToken(null);
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
}
