import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import Candidate from "./pages/Candidate";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route

          path="/"

          element={<Home />}

        />

        <Route

          path="/candidate"

          element={<Candidate />}

        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;