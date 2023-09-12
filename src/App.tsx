import { BrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import AuthProvider, { AuthContext } from "./Context/AuthContext";
import { PiupiuRoutes } from "./routes/PiupiuRoutes";

function App() {
  // const { auth } = useContext(AuthContext);
  // console.log(auth);
  return (
    <BrowserRouter>
      <PiupiuRoutes />
    </BrowserRouter>
  );
}

export default App;
