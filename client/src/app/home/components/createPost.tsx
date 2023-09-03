import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { useAtom } from 'jotai'
import { Seen } from '../page'

const CreatePost = () => {
  const [seen, setSeen] = useAtom(Seen);
  const togglePop = () => {
    setSeen(!seen);
  };

  return (
    <div className="fixed w-[100%] h-[100%] top-0 left-0  backdrop-blur-sm z-[10000] flex justify-center items-center ">
      <div className="fixed w-[60%] h-[49rem]  left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] border border-white bg-black overscroll-none rounded-xl">
        <div className="flex justify-between px-5 pt-5">
          <div className="text-xl font-semibold">Create Post</div>
          <div onClick={togglePop}>
            <IoMdClose size={35} />
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-[700px] flex-col p-5 bg-black">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-[#fefefe]  hover:bg-[#272727] h-[600px] m-5 bg-black"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 "
                aria-hidden="true"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
          <div className="relative my-5 w-full">
            <input
              type="text"
              id="floating_outlined"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Caption
            </label>
          </div>
          <div className="w-full flex justify-between m-5">
            <div className="p-2 lg:p-5 px-5 lg:px-10 bg-black border border-white rounded-xl text-red-500 " onClick={togglePop}>
              Cancel
            </div>
            <div className=" p-2 lg:p-5 bg-blue-500 rounded-xl">Create Post</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost
