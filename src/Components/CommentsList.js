import React, { useState } from "react";
// import ReactDOM from "react-dom";
import "./Styles/CommentsList.css";
import Data from "../data.json";
import SingleComment from "./SingleComment";
import NewMsg from "./NewMsg";
import DeleteComment from "./DeleteComment";
// import { useEffect } from "react/cjs/react.development";

const CommentsList = () => {
  const [showModal, setShowModal] = useState(false);
  const { currentUser, comments } = Data;
  const [allComments, setAllComments] = useState(comments);
  const [isReply, setIsReply] = useState(false);
  const [commentID, setCommentID] = useState(0);

  const clickReplyHandler = function (id) {
    setIsReply(true);
    setCommentID(id);
  };

  const displayModalHandler = function (id) {
    showModal ? setShowModal(false) : setShowModal(true);
    // Passing by id from SingleComment to DeleteComment props
    // commentIdToDelete = id;
    setCommentID(id);
  };
  const deleteCommentHandler = function (id) {
    // Iteration to filter main comments level
    const mainCommentsArr = allComments.filter((comment) => comment.id !== id);
    // Iteration to filter replies comments level
    const newArr = mainCommentsArr.map(function (comment) {
      const filteredReplies = comment.replies.filter(
        (comment) => comment.id !== id
      );
      return { ...comment, replies: filteredReplies };
    });
    setAllComments(newArr);
    displayModalHandler();
  };

  return (
    <section className="comments-list">
      {showModal && (
        <DeleteComment
          displayModal={displayModalHandler}
          deleteMsg={deleteCommentHandler}
          id={commentID}
        />
      )}
      {allComments.map((comment, index) => (
        <div key={comment.id}>
          {/* {showModal && (
            <DeleteComment
              displayModal={displayModalHandler}
              deleteMsg={deleteCommentHandler}
              id={comment.id}
            />
          )} */}
          <SingleComment
            singleCommentClass="single-comment"
            activeUser={currentUser}
            key={comment.id}
            comment={comment}
            allComments={allComments}
            setAllComments={setAllComments}
            index={index}
            displayModal={displayModalHandler}
            onclickReplyHandler={clickReplyHandler}
          />

          {isReply && comment.id === commentID && (
            <NewMsg
              activeUser={currentUser}
              userToReply={comment.user.username}
              btnType="REPLY"
              allComments={allComments}
              setAllComments={setAllComments}
              parentCommentID={comment.id}
              parentIndex={index}
              setIsReply={setIsReply}
            />
          )}
          {comment.replies.length > 0 && (
            <section className="section-reply">
              {comment.replies.map((reply, indexReply) => (
                <div key={reply.id}>
                  {/* {showModal && (
                    <DeleteComment
                      displayModal={displayModalHandler}
                      deleteMsg={deleteCommentHandler}
                      id={reply.id}
                    />
                  )} */}
                  <SingleComment
                    singleCommentClass="single-comment reply-msg"
                    activeUser={currentUser}
                    key={reply.id}
                    comment={reply}
                    allComments={allComments}
                    setAllComments={setAllComments}
                    indexParent={index}
                    indexReply={indexReply}
                    displayModal={displayModalHandler}
                    onclickReplyHandler={clickReplyHandler}
                  />
                  {isReply && reply.id === commentID && (
                    <NewMsg
                      activeUser={currentUser}
                      userToReply={reply.user.username}
                      btnType="REPLY"
                      allComments={allComments}
                      setAllComments={setAllComments}
                      parentCommentID={comment.id}
                      parentIndex={index}
                      setIsReply={setIsReply}
                    />
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      ))}
      <NewMsg
        activeUser={currentUser}
        btnType="SEND"
        allComments={allComments}
        setAllComments={setAllComments}
      />
    </section>
  );
};
export default CommentsList;
