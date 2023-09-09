import React from "react";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { showComments } from "@/app/atoms/atoms";
import { useAtom } from "jotai";
import { comments } from "@/app/atoms/atoms";

import { useEffect } from "react";

import apolloClient from "@/app/graphql/client";
import { GET_COMMENTS } from "@/app/graphql/query/comment";
import { useLazyQuery } from "@apollo/client";


const CommentBox = (props) => {
  const [showComment, setShowComments] = useAtom(showComments);
  const [Coments, setComment] = useAtom(comments);


 


  const toggleComment = () => {
    setShowComments(!showComment);
    console.log(comments);
  };

  const renderedComments = Coments.map((comment: any) => {
    return (
      <li key={comment.author} className="border-b border-[#606060] px-1 py-2 flex flex-col">
        <div className="font-semibold">{comment.author }</div>
        <div>{comment.comment}</div>
      </li>
    );
  });

  return (
    <div
      className={
        showComment
          ? "fixed bg-[#030303] border border-[#262626]  h-[90%] w-[90%] lg:w-[40%] overflow-scroll top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-3xl p-5 "
          : "hidden"
      }
    >
      <div className="flex justify-between py-5">
        <h4 className="font-semibold  ">Comments</h4>
        <div onClick={toggleComment}>
          <IoMdClose size={27} />
        </div>
      </div>
      <ul>{renderedComments}</ul>
    </div>
  );
};

export default CommentBox;
