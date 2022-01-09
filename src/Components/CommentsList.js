import React, { useState } from "react";
// import ReactDOM from "react-dom";
import "./Styles/CommentsList.css";
import Data from "../data.json";
import SingleComment from "./SingleComment";
import NewMsg from "./NewMsg";
import DeleteComment from "./DeleteComment";
// import ReplayMsg from "./ReplayMsg";

const CommentsList = () => {
  const [showModal, setShowModal] = useState(false);
  const { currentUser, comments } = Data;
  const [allComments, setAllComments] = useState(comments);
  // console.log(allComments);
  // Set state status for Reply Comment
  const [isReply, setIsReply] = useState(false);
  const [commentID, setCommentID] = useState(0);

  const clickEditHandler = function (id) {
    // console.log(id);
    setIsReply(true);
    setCommentID(id);
    // console.log(commentID);
  };
  const displayModalHandler = function () {
    showModal ? setShowModal(false) : setShowModal(true);
    console.log(allComments);
  };
  const deleteCommentHandler = function (id) {
    const newArr = allComments.map(function (comment) {
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
      {/* {showModal && (
        <DeleteComment
          displayModal={displayModalHandler}
          deleteComment={deleteCommentHandler}
        />
      )} */}
      {allComments.map((comment, index) => (
        <>
          <SingleComment
            singleCommentClass="single-comment"
            comment={comment}
            allComments={allComments}
            setAllComments={setAllComments}
            // index={index}
            key={comment.id}
            // id={comment.id}
            // score={comment.score}
            // createdAt={comment.createdAt}
            // userName={comment.user.username}
            // userImage={comment.user.image.png}
            // content={comment.content}

            onClickEditHandler={clickEditHandler}
          />

          {isReply && comment.id === commentID && (
            <NewMsg
              activeUser={currentUser}
              userToReply={comment.user.username}
              btnType="REPLY"
            />
          )}
          {comment.replies.length > 0 && (
            <section className="section-reply">
              {comment.replies.map((reply, indexReply) => (
                <>
                  {showModal && (
                    <DeleteComment
                      displayModal={displayModalHandler}
                      deleteComment={deleteCommentHandler}
                      id={reply.id}
                    />
                  )}
                  <SingleComment
                    singleCommentClass="single-comment replay-msg"
                    key={reply.id}
                    comment={reply}
                    activeUser={currentUser}
                    allComments={allComments}
                    setAllComments={setAllComments}
                    // index={index}
                    // indexReply={indexReply}
                    // pathReply={`[${index}].replies[${indexReply}]`}
                    // id={reply.id}
                    // score={reply.score}
                    // createdAt={reply.createdAt}
                    // userName={reply.user.username}
                    // userImage={reply.user.image.png}
                    // replyingTo={reply.replyingTo}
                    // content={reply.content}

                    displayModal={displayModalHandler}
                    onClickEditHandler={clickEditHandler}
                  />
                  {isReply && reply.id === commentID && (
                    <NewMsg
                      activeUser={currentUser}
                      userToReply={reply.user.username}
                      btnType="REPLY"
                    />
                  )}
                </>
              ))}
            </section>
          )}
        </>
      ))}
      <NewMsg activeUser={currentUser} btnType="SEND" />
    </section>
  );
};
export default CommentsList;
