import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"

import EditPage from "./components/EditPage";
import HomePage from "./HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:eventId" element={<EditPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
