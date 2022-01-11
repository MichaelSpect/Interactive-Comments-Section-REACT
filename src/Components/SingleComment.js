import React, { useState, useRef } from "react";
// import { FocusEvent } from "react";

import "./Styles/SingleComment.css";
import Likes from "./Likes";

const SingleComment = ({
  comment,
  activeUser,
  onclickReplyHandler,
  singleCommentClass,
  allComments,
  setAllComments,
  indexParent,
  indexReply,
  pathReply,
  displayModal,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const contentEditRef = useRef();
  // console.log(allComments);
  let currentUser = "";
  if (activeUser) {
    currentUser = activeUser.username;
  }

  const clickEditHandler = function (e) {
    // console.log("CLICK EDIT", contentEditRef);
    setIsEdit(true);
    // Activate contentEditable atribut on content comment
    e.target.click();
    contentEditRef.current.click();
  };

  const updateCommentHandler = function () {
    console.log("UPDATE");
    const updatedContent = contentEditRef.current.innerText;
    console.log(updatedContent);
    console.log(comment);
    console.log("ID", comment.id, indexParent, indexReply);
    const newEditedObj = { ...comment, content: updatedContent };
    console.log(newEditedObj);
    const updatedComments = (allComments[indexParent].replies[
      indexReply
    ].content = updatedContent);
    console.log(allComments);
    // setAllComments(updatedComments);
    // const newEditedParent = {
    //   ...allComments[indexParent],
    //   replies: [...allComments[indexParent].replies, newEditedObj],
    // };
    // const updatedAllComments = allComments.splice(
    //   indexParent,
    //   1,
    //   newEditedParent
    // );
    // console.log(updatedAllComments);
    // Update comment if comment is in replies array
    // setAllComments(
    //   prevComents.splice(indexParent, 1, {
    //     ...prevComents[indexParent],
    //     replies: [...prevComents[indexParent].replies, newEditedObj],
    //   })
    // );

    setIsEdit(false);
    console.log(allComments);
  };
  return (
    <section className={singleCommentClass}>
      <Likes
        score={comment.score}
        id={comment.id}
        comment={comment}
        allComments={allComments}
        setAllComments={setAllComments}
        // index={index}
        // indexReply={indexReply}
        // pathReply={pathReply}
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
              <div
                className="call-action delete"
                onClick={displayModal}
                deleteComment={comment.id}
              >
                Delete
              </div>
            </div>
            <div className="edit">
              <img src="./images/icon-edit.svg" alt="img-edit" />
              <div className="call-action edit" onClick={clickEditHandler}>
                Edit
              </div>
            </div>
          </div>
        ) : (
          <div
            className="header-right header-reply"
            onClick={() => onclickReplyHandler(comment.id)}
          >
            <img src="./images/icon-reply.svg" alt="img-reply" />
            <div className="call-action">Reply</div>
          </div>
        )}
      </div>
      {/* COMMENT CONTENT SECTION */}
      <div
        className="comment-content"
        contentEditable={isEdit ? "true" : "false"}
        suppressContentEditableWarning={true}
        ref={contentEditRef}
      >
        {comment.replyingTo ? (
          <span className="replay-to">@{comment.replyingTo} </span>
        ) : (
          false
        )}
        {comment.content}
      </div>
      {/* UPDATE BUTTON */}
      {isEdit && (
        <button className="button update-btn" onClick={updateCommentHandler}>
          UPDATE
        </button>
      )}
    </section>
  );
};
export default SingleComment;
