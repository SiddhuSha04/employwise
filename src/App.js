import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
