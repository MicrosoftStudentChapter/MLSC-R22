import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Waiting from "./components/Waiting";
import Landing from "./components/Landing";
import Quiz from "./components/Quiz";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies(["name"]);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        {cookies.user && <Route path="/waiting" element={<Waiting />} />}
        {cookies.user && <Route path="/quiz" element={<Quiz />} />}
      </Routes>
    </Router>
  );
}

export default App;
