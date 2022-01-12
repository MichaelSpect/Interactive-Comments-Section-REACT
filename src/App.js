import React from "react";
import Atribution from "./Components/Atribution";
import CommentsList from "./Components/CommentsList";
import "./Components/Styles/App.css";

function App() {
  return (
    <section className="main-container">
      <h1>Frontend Mentor - Interactive comments section</h1>
      <CommentsList />
      <Atribution />
    </section>
  );
}

export default App;
