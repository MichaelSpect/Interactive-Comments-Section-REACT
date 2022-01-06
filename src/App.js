import React from "react";
import CommentsList from "./Components/CommentsList";
import "./Components/Styles/App.css";

function App() {
  return (
    <section className="main-container">
      <h1>Let's get started!</h1>
      <CommentsList />
      {/* <section className="comments-container"></section> */}
    </section>
  );
}

export default App;
