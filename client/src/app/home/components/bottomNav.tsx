import React from 'react'
import { BsPostcardHeart } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { Seen } from '../page';
import { useAtom } from 'jotai';

const BottomNav = () => {
    const [seen, setSeen] = useAtom(Seen);
    const togglePop = () => {
        setSeen(!seen);
    };
    return (
      <div className="fixed bottom-0 left-0 w-full xl:hidden">
        <div className=" z-50 w-full h-16 bg-black border-t border-gray-200 dark:bg-black dark:border-gray-600 ">
          <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center font-medium px-5  group"
            >
              <BiHomeAlt
                className="w-5 h-5 mb-1 text-gray-500 group-hover:text-white"
               
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </BiHomeAlt>
              <span className="text-sm text-gray-500 group-hover:text-white">
                Home
              </span>
            </button>
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center font-medium px-5 group"
            >
              <PiPaperPlaneTilt
                className="w-5 h-5 mb-1 text-gray-500 group-hover:text-white"
             
              >
              </PiPaperPlaneTilt>
              <span className="text-sm text-gray-500 group-hover:text-white">
                Chat
              </span>
            </button>
            <button
              type="button"
                        className="inline-flex flex-col items-center justify-center font-medium px-5  group"
                        onClick={togglePop}
            >
              <BsPostcardHeart
                className="w-6 h-6 mb-1 text-gray-500 group-hover:text-white"
               >
              </BsPostcardHeart>
              <span className="text-sm text-gray-500 group-hover:text-white">
                Create Post
              </span>
            </button>
          </div>
        </div>
      </div>
    );
}

export default BottomNav
