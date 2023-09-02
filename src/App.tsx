import { Outlet } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { auth } = useContext(AuthContext);
  console.log(auth);
  return <Outlet />;
}

export default App;
