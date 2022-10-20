import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Waiting from "./components/Waiting";
import Landing from "./components/Landing";
import Quiz from "./components/Quiz";
import { useCookies } from "react-cookie";
import TimeOver from "./components/TimeOver";

function App() {
  const [cookies, setCookie] = useCookies(["name"]);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        {cookies.user ? (
          <Route path="/waiting" element={<Waiting />} />
        ) : (
          <Route path="/waiting" element={<TimeOver />} />
        )}
        {cookies.user ? (
          <Route path="/quiz" element={<Quiz />} />
        ) : (
          <Route path="/quiz" element={<TimeOver />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
