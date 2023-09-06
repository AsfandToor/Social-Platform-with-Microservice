"use client";
import React from "react";

const Postcard = (props: any) => {
  return (
    <div className="flex flex-col w-[470px] mb-[50px] border-t border-[#757575] h-fit">
      <div className="text-white text-l font-bold py-3">{props.user}</div>
      <img
        className="w-[470px] h-[350px] object-contain mb-3 bg-black border-y py-3 border-[#757575]"
        src={props.img}
      />
      <div className="text-white text-l ">{props.likes} likes</div>
      <div className="text-white text-l font">
        <span className="font-bold">{props.user}</span> {props.caption}
      </div>
      <div className="text-[#dadada] text-l">
        view all {props.comments} comments
      </div>
    </div>
  );
};

export default Postcard;
