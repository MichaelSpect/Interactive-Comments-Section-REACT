import React, { useState, useRef, useEffect, useImperativeHandle } from "react";
import "./Styles/NewMsg.css";

function NewMsg(props) {
  const contentInputRef = useRef();
  const [newMsgContent, setNewMsgContent] = useState(
    props.userToReply
      ? `@${props.userToReply} Add a comment...`
      : "Add a comment..."
  );
  const createID = function () {
    return Math.floor(Math.random() * 1000);
  };

  useEffect(() => {
    contentInputRef.current.focus();
  }, []);
  const sendMsgHandler = function () {
    const enteredComment = contentInputRef.current.textContent;
    const newCommentObj = {
      id: createID(),
      content: enteredComment,
      createdAt: "now",
      score: 0,
      user: {
        image: {
          png: props.activeUser.image.png,
          webp: props.activeUser.image.webp,
        },
        username: props.activeUser.username,
      },
      replies: [],
    };

    if (props.btnType === "SEND") {
      props.setAllComments((prevComents) => [...prevComents, newCommentObj]);
      setNewMsgContent("Add a comment...");
    }
    if (props.btnType === "REPLY") {
      const newReplyObj = { ...newCommentObj, replyingTo: props.userToReply };

      props.setAllComments((prevComents) => [
        ...prevComents.filter((comm) => comm.id !== props.parentCommentID),
        {
          ...prevComents[props.parentIndex],
          replies: [...prevComents[props.parentIndex].replies, newReplyObj],
        },
      ]);
      // CLose reply window after submit reply
      props.setIsReply(false);
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
        suppressContentEditableWarning={true}
        data-placeholder=" Add a comment..."
        onInput={() => setNewMsgContent("")}
        ref={contentInputRef}
      >
        {newMsgContent}
      </div>
      <button className="button send-btn" onClick={sendMsgHandler}>
        {props.btnType}{" "}
      </button>
    </section>
  );
}

export default NewMsg;
