import React, { useState } from "react";
import { BsReplyFill } from "react-icons/bs";
import AddComment from "./AddComment";

const Comments = ({
  fullName,
  title,
  date,
  image,
  id,
  handleSubmit,
  handleGetReplays,
  isReplay,
}) => {
  const [commentReplayOpen, setCommentReplayOpen] = useState(false);

  const handleCloseReplay = () => setCommentReplayOpen(false);

  return (
    <li
      className={`bg-white dark:bg-black rounded-md px-2 py-3 my-5 ${
        isReplay
          ? "w-[80%] border border-gray-900 dark:border-gray-600 mr-auto"
          : "relative"
      }`}
    >
      <div className=" flex justify-between my-4">
        <div className="flex gap-4">
          <div>
            <img src={image} alt="profile" className="w-10 rounded-full" />
          </div>
          <div>
            <span className="block mb-4 text-blue-700 sm:text-base text-xs">
              {fullName}
            </span>
            <span className="block sm:text-base text-xs">{title}</span>
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-end">
          <span className=" sm:text-base text-xs">{date}</span>
          <BsReplyFill
            className="w-full text-green-400 cursor-pointer"
            onClick={() => setCommentReplayOpen(true)}
          />
        </div>
      </div>
      <div
        className={`${
          commentReplayOpen ? "block" : "hidden"
        } w-full p-8 border border-gray-200 rounded-lg`}
      >
        <div className="flex justify-start items-center gap-4 mb-5">
          <h2 className="md:text-3xl sm:text-2xl text-xl text-gray-600">
            پاسخ به نظر
          </h2>
          <span
            className="text-[#ff3434] font-bold h-fit block cursor-pointer"
            onClick={() => setCommentReplayOpen(false)}
          >
            لغو پاسخ
          </span>
        </div>
        <div>
          <AddComment
            handleSubmit={handleSubmit}
            parentID={id}
            handleCloseReplay={handleCloseReplay}
          />
        </div>
      </div>
      {handleGetReplays(id).length > 0 ? (
        <ul>
          {handleGetReplays(id)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((comment) => (
              <Comments
                key={comment.id}
                {...comment}
                handleSubmit={handleSubmit}
                handleGetReplays={handleGetReplays}
                isReplay={true}
              />
            ))}
        </ul>
      ) : null}
    </li>
  );
};

export default Comments;
