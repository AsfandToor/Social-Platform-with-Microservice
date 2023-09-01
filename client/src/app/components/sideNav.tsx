import React from 'react'
import { BsPostcardHeart } from "react-icons/bs";
import { TbLogout2 } from "react-icons/tb";
import { BiHomeAlt } from "react-icons/bi";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { useState } from "react";

const SideNav = () => {
   const [navBar, setNav] = useState(false);
    const setNavBar = () => {
        setNav(!navBar);
        };
  return (
    <div className=" bg-[color:var(--background-start-rgb)] h-[100%]  flex flex-col align-center w-[100%] xl:w-[15%] p-4 xl:fixed z-[10000]  border-r-[1px] border-r-white">
      <div className=" w-[100%] ">
        <h1
          className={
            "text-[var(--header-text-color)] text-[25px] leading-[24px] font-extrabold cursor-pointer md:mt-7 xl:ml-5"
          }
        >
          Awesome X
        </h1>

        <a
          className="mt-3 md:mt-7  text-xl ml-2 p-3  rounded hover:cursor-pointer block bg-[color:var(--background-color-2)] bg-white text-black font-bold"
          onClick={setNavBar}
        >
          <BiHomeAlt className="inline" />
          <h1 className="ml-3 inline-block "> Home</h1>
        </a>
        <a
          className="mt-1 md:mt-7 text-white text-xl ml-2 p-3  rounded hover:cursor-pointer block "
          onClick={setNavBar}
        >
          <PiPaperPlaneTilt className="inline" />
          <h1 className="ml-3 inline-block">Chat</h1>
        </a>

        <a
          className="mt-1 md:mt-7 text-white text-xl ml-2 p-3  rounded hover:cursor-pointer block "
          onClick={setNavBar}
        >
          <BsPostcardHeart className="inline" />
          <h1 className="ml-3 inline-block">New Post</h1>
        </a>
      </div>
      <div className="absolute bottom-0">
        <button
          href="#"
          className="block text-xl font-bold text-white p-6 hover:cursor-pointer "
        >
          {" "}
          <TbLogout2 className="inline" />
          <a className="ml-3 inline-block">Logout</a>
        </button>
      </div>
    </div>
  );
};



export default SideNav
