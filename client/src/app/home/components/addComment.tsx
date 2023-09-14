import React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Create_Comment_Mutation } from "@/app/graphql/mutations/comment";
import apolloClient from "@/app/graphql/client";
import { useAtom } from "jotai";
import { comments } from "@/app/atoms/atoms";

const AddComment = ({ post }) => {
    const [comment, setText] = useState("");
    const [Coments, setComment] = useAtom(comments);

  const handleTextareaChange = (e) => {
    const newText = e.target.value;
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
    setText(newText);
    };
    


     const [createComment, { loading }] = useMutation(Create_Comment_Mutation, {
       client: apolloClient,
       onCompleted: (data) => {
         console.log(data);
       },
     });
    
    const handleCreateComment = () => {
           const jsonObject = {
             comment,
             author: "64f8098bf7a2a0d97675fe01",
             post
           };


           createComment({
             variables: {
               createCommentInput: jsonObject,
             },
           })
             .catch((err) => {
               console.log(err);
             })
             .then((res) => {
              
                
              
               setText("");
             });
      };
    
  return (
    <div className="bg-black w-full py-4 ">
      <form className="flex w-full justify-between border border-0">
        <textarea
          type="text"
          className="bg-black text-white   p-0   border-0 w-[80%] focus:outline-none focus:border-0  focus:ring-0 resize-none  max-h-40 h-auto"
          placeholder="Add a comment ... "
          value={comment}
          onChange={handleTextareaChange}
        />
        {comment && (
          <button
            className="  text-[#0095f6] font-bold px-2 py-1 rounded "
            onClick={handleCreateComment}
          >
            Post
          </button>
        )}
      </form>
    </div>
  );
};

export default AddComment;
