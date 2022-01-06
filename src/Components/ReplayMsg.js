import React from "react";

const ReplayMsg = (data) => {
  return (
    <section className="single-comment new-msg">
      <div className="user-avatar">
        <img src={data.activeUserImg} alt="user-avatar" width="35" />
      </div>
      <div
        className="new-content msg-editable"
        contentEditable="true"
        data-placeholder=" Add a comment..."
      >
        {}
      </div>
      <button className="button reply-btn">REPLY</button>
    </section>
  );
};

export default ReplayMsg;
