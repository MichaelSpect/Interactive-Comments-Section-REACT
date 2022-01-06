import React, { useState } from "react";
// import ReactDOM from "react-dom";
import "./Styles/CommentsList.css";
import Data from "../data.json";
import SingleComment from "./SingleComment";
import NewMsg from "./NewMsg";
// import ReplayMsg from "./ReplayMsg";

const CommentsList = () => {
  const { currentUser, comments } = Data;
  console.log(comments);
  // Set state status for Reply Comment
  const [isReply, setIsReply] = useState(false);
  const [commentID, setCommentID] = useState(0);

  const clickEditHandler = function (id) {
    // console.log(id);
    setIsReply(true);
    setCommentID(id);
    // console.log(commentID);
  };
  return (
    <section className="comments-list">
      {comments.map((comment) => (
        <>
          <SingleComment
            singleCommentClass="single-comment"
            comment={comment}
            // key={comment.id}
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
              activeUserImg={currentUser.image.png}
              userToReply={comment.user.username}
              btnType="REPLY"
            />
          )}
          {comment.replies.length > 0 && (
            <section className="section-reply">
              {comment.replies.map((reply) => (
                <>
                  <SingleComment
                    singleCommentClass="single-comment replay-msg"
                    key={reply.id}
                    comment={reply}
                    activeUser={currentUser}
                    // id={reply.id}
                    // score={reply.score}
                    // createdAt={reply.createdAt}
                    // userName={reply.user.username}
                    // userImage={reply.user.image.png}
                    // replyingTo={reply.replyingTo}
                    // content={reply.content}

                    onClickEditHandler={clickEditHandler}
                  />
                  {isReply && reply.id === commentID && (
                    <NewMsg
                      activeUserImg={currentUser.image.png}
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
      <NewMsg activeUserImg={currentUser.image.png} btnType="SEND" />
    </section>
  );
};
export default CommentsList;
