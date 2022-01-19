import React, { useState, useRef, useEffect } from "react";
import "./Styles/SingleComment.css";
import Likes from "./Likes";

const SingleComment = ({
  comment,
  activeUser,
  onclickReplyHandler,
  singleCommentClass,
  allComments,
  setAllComments,
  index,
  indexParent,
  indexReply,
  pathReply,
  displayModal,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const contentEditRef = useRef();
  let currentUser = "";
  if (activeUser) {
    currentUser = activeUser.username;
  }

  const clickEditHandler = function (e) {
    // Activate contentEditable atribut on content comment
    setIsEdit(true);
    // setEditContent(contentEditRef.current.innerText);
  };

  function setEndOfContenteditable(contentEditableElement) {
    let range, selection;
    if (document.createRange) {
      range = document.createRange(); //Create a range
      range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection(); //get the selection object (allows you to change selection)
      selection.removeAllRanges(); //remove any selections already made
      selection.addRange(range); //make the range you have just created the visible selection
    }
  }
  useEffect(() => {
    // isEdit && contentEditRef.current.focus();
    if (isEdit) {
      setEndOfContenteditable(contentEditRef.current);
    }
  }, [isEdit]);
  const clickDeleteHandler = function (commentId) {
    displayModal(commentId);
  };

  const updateCommentHandler = function (replyToString) {
    let updatedContent;
    if (replyToString.startsWith("@")) {
      updatedContent = contentEditRef.current.innerText.slice(
        replyToString.length
      );
    } else {
      updatedContent = contentEditRef.current.innerText;
    }
    // const newEditedObj = { ...comment, content: updatedContent };

    // Update comment on replies array of parent object
    allComments[indexParent]
      ? (allComments[indexParent].replies[indexReply].content = updatedContent)
      : (allComments[index].content = updatedContent);
    setIsEdit(false);
    // console.log(allComments);
    // Update via setAllComments state - Doesn't work...  Unfinished!
    // setAllComments((prevComents) =>
    //   prevComents.splice(indexParent, 1, {
    //     ...prevComents[indexParent],
    //     replies: [
    //       ...prevComents[indexParent].replies[indexReply],
    //       newEditedObj,
    //     ],
    //   })
    // );
  };
  return (
    <section className={singleCommentClass}>
      <Likes
        score={comment.score}
        id={comment.id}
        comment={comment}
        allComments={allComments}
        setAllComments={setAllComments}
      />

      <div className="header-left">
        <div className="user-avatar">
          <img src={comment.user.image.png} alt="user-avatar" />
        </div>
        <div className="user-name">
          {comment.user.username}
          {comment.user.username === currentUser && (
            <span className="active-user">you</span>
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
                onClick={() => clickDeleteHandler(comment.id)}
                // deleteComment={comment.id}
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
        {comment.replyingTo && (
          <span className="reply-to">{`@${comment.replyingTo} `}</span>
        )}
        {comment.content}
      </div>
      {/* UPDATE BUTTON */}
      {isEdit && (
        <button
          className="button update-btn"
          onClick={() =>
            updateCommentHandler(
              comment.replyingTo ? `@${comment.replyingTo}` : comment.content
            )
          }
        >
          UPDATE
        </button>
      )}
    </section>
  );
};
export default SingleComment;
