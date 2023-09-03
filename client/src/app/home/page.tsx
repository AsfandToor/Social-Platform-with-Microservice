"use client";
import React from "react";
import { useState } from "react";
import {atom,useAtom } from "jotai";
import SideNav from "./components/sideNav";
import Postcard from "./components/postcard";
import CreatePost from "./components/createPost";
import post from "../DemoData/post.js";
import BottomNav from "./components/bottomNav";

export const Seen = atom(false);
const Page = () => {

    const [seen, setSeen] = useAtom(Seen);
  
  return (
    <div className="flex w-full ">
          <div className="hidden xl:block">
                <SideNav></SideNav>
          </div>

            <BottomNav></BottomNav>
          
          <div className="w-[100%] xl:w-[85%]  ">
              {seen ? (<CreatePost></CreatePost>):null }
        <div className="flex flex-col items-center mt-11">
          {post.map((post) => (
            <Postcard
              user={post.user}
              img={post.img}
              caption={post.caption}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Page;
