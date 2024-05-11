import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./loginpage/loginpage";
import SignupPage from "./signuppage/signuppage";
import Welcomepage from "./Welcomepage/welcomepage";
import "react-quill/dist/quill.snow.css";
import InboxPage from "./Inbox/Inboxpage";
import SendMailPage from "./sendmailpage/sendmailpage";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/sendmailpage" element={<SendMailPage />} />
          <Route path="/" element={<Welcomepage />} />
          <Route path="/inboxpage" element={<InboxPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/signuppage" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
