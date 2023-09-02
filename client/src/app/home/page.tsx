"use client";
import React from "react";
import { useState } from "react";


import SideNav from "../components/sideNav";
import Postcard from "../components/postcard";


import post from "../DemoData/post.js"

const Page = () => {
    return (
        <div className="flex">
            <SideNav />
            <div className="w-[100%] xl:w-[85%]  ">
               
                <div className="flex flex-col items-center mt-11">
                    {
                        post.map((post) => (
                            <Postcard
                                user={post.user}
                                img={post.img}
                                caption={post.caption}
                                likes={post.likes}
                                comments={post.comments}
                            />
                        ))
                    }
                </div>

            </div>
        </div>
    )  
        
};
export default Page;
