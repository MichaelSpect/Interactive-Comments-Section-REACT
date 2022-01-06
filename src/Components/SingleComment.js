// import { useState } from "react";
import "./Styles/SingleComment.css";
import Likes from "./Likes";

const SingleComment = ({
  comment,
  activeUser,
  onClickEditHandler,
  singleCommentClass,
  allComments,
  setAllComments,
}) => {
  console.log(allComments);
  let currentUser = "";
  if (activeUser) {
    currentUser = activeUser.username;
  }

  return (
    <section className={singleCommentClass}>
      <Likes
        score={comment.score}
        id={comment.id}
        allComments={allComments}
        setAllComments={setAllComments}
      />

      <div className="header-left">
        <div className="user-avatar">
          <img src={comment.user.image.png} alt="user-avatar" />
        </div>
        <div className="user-name">
          {comment.user.username}
          {comment.user.username === currentUser ? (
            <span className="active-user">you</span>
          ) : (
            false
          )}
        </div>
        <div className="date-created">{comment.createdAt}</div>
      </div>

      <div className="header-right">
        {comment.user.username === currentUser ? (
          <div className="header-right user-edit">
            <div className="delete">
              <img src="./images/icon-delete.svg" alt="" />
              <div className="call-action delete">Delete</div>
            </div>
            <div className="edit">
              <img src="./images/icon-edit.svg" alt="img-edit" />
              <div className="call-action edit">Edit</div>
            </div>
          </div>
        ) : (
          <div
            className="header-right header-reply"
            onClick={() => onClickEditHandler(comment.id)}
          >
            <img src="./images/icon-reply.svg" alt="img-reply" />
            <div className="call-action">Reply</div>
          </div>
        )}
      </div>

      <section className="comment-content">
        {comment.replyingTo ? (
          <span className="replay-to">@{comment.replyingTo} </span>
        ) : (
          false
        )}
        {comment.content}
      </section>
    </section>
  );
};
export default SingleComment;
