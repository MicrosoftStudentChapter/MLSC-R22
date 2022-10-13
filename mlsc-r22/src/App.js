import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Waiting from "./components/Waiting";
import Landing from "./components/Landing";
import Quiz from "./components/Quiz";



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/waiting" element={<Waiting />} />
				<Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
