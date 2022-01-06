import React from "react";
import "./Styles/NewMsg.css";

function NewMsg(props) {
  return (
    <section className="single-comment new-msg">
      <div className="user-avatar">
        <img src={props.activeUserImg} alt="user-avatar" width="35" />
      </div>
      <div
        className="new-content msg-editable"
        contentEditable="true"
        data-placeholder=" Add a comment..."
      >
        {`@${props.userToReply}. `}
      </div>
      <button className="button send-btn">{props.btnType}</button>
    </section>
  );
}

export default NewMsg;
