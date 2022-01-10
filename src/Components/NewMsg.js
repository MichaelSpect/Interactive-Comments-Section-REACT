import React, { useState, useRef } from "react";
import "./Styles/NewMsg.css";

function NewMsg(props) {
  const contentInputRef = useRef();
  const [newMsgContent, setNewMsgContent] = useState("");
  const createID = function () {
    return Math.floor(Math.random() * 1000);
  };
  console.log(createID());
  const newMsgHandler = function () {
    if (props.btnType === "SEND") {
      // const newCommentObj = {
      //   id: createID(),
      //   content:
      //     "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      //   createdAt: "now",
      //   score: 0,
      //   user: {
      //     image: {
      //       png: {props.activeUser.image.png},
      //       webp: {props.activeUser.image.webp},
      //     },
      //     username: {props.activeUser.username},
      //   },
      //   replies: [],
      // };
    }
  };
  const sendMsgHandler = function () {
    const enteredComment = contentInputRef.current.textContent;
    if (props.btnType === "SEND") {
      console.log(enteredComment);
    }
    if (props.btnType === "REPLY") {
      console.log(enteredComment);
    }
  };

  return (
    <section className="single-comment new-msg">
      <div className="user-avatar">
        <img src={props.activeUser.image.png} alt="user-avatar" width="35" />
      </div>
      <div
        className="new-content msg-editable"
        contentEditable="true"
        data-placeholder=" Add a comment..."
        ref={contentInputRef}
      >
        {`@${props.userToReply}. `}
      </div>
      <button className="button send-btn" onClick={sendMsgHandler}>
        {props.btnType}{" "}
      </button>
    </section>
  );
}

export default NewMsg;
