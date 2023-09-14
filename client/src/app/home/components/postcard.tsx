"use client";
import React from "react";
import { showComments } from "@/app/atoms/atoms";
import { comments } from "@/app/atoms/atoms";
import { useAtom } from "jotai";
import CommentBox from "./commentBox";

import apolloClient from "@/app/graphql/client";
import { GET_COMMENTS } from "@/app/graphql/query/comment";
import { useLazyQuery } from "@apollo/client";
import AddComment from "./addComment";

const Postcard = (props: any) => {
  const [showComment, setShowComments] = useAtom(showComments);
  const [comment, setComments] = useAtom(comments);

  const toggleComment = () => {
    setShowComments(!showComment);
    console.log(props.id);
  };

  const [loadComments, { data }] = useLazyQuery(GET_COMMENTS, {
    client: apolloClient,
    initialFetchPolicy: "network-only",
    fetchPolicy: "network-only",
  });

  return (
    <div className="flex flex-col w-full md:w-[470px] mb-[20px] border-t mt-2 pt-1 border-[#262626] h-fit">
      <div className="text-white text-l font-bold py-3">{props.user}</div>
      <img
        className="w-[470px] h-[350px] object-contain mb-3 bg-black border py-3 border-[#262626]"
        src={props.img}
      />
      <div className="text-white text-l ">{props.likes} likes</div>
      <div className="text-white text-l font">
        <span className="font-bold">{props.user}</span> {props.caption}
      </div>
      <div className="text-[#dadada] text-l">
        <div className="flex justify-between">
          {
            //!if comment length is greater than 0, show "View {size of comment array}" else show "No comments yet" also add tailwind classes to underline is user hover over view comments
            props.comments.length > 0 ? (
              <div
                className=" hover:underline pt-2"
                onClick={() => {
                  setComments([]);
                  setShowComments(!showComment);

                  loadComments({
                    variables: {
                      postId: props.id,
                    },
                    onCompleted: (data) => {
                      setComments(data.getPostById.comments);
                    },
                  });
                }}
              >
                View {props.comments.length} comments
              </div>
            ) : (
              <div className="pt-2">No comments yet</div>
            )
          }
      
          <CommentBox id={props.id} />
        </div>
          <div className="w-full ">
            <AddComment post={props.id} />  
          </div>
      </div>
    </div>
  );
};

export default Postcard;
