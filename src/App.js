import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./loginpage/loginpage";
import SignupPage from "./signuppage/signuppage";
function App() {
  return (
    <Router>
      <div className="App">
       
        <Routes>
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
