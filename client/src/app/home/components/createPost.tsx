import React from "react";
import { IoMdClose } from "react-icons/io";
import { useAtom } from "jotai";
import { Seen } from "@/app/atoms/atoms";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Create_Post_Mutation } from "@/app/graphql/mutations/post";
import apolloClient from "@/app/graphql/client";

const CreatePost = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");

  const [loader, setLoader] = useState(false);
  

  const [createPost] = useMutation(Create_Post_Mutation, {
    client: apolloClient,
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const handleImageChange = (e: {
    target: { files: (Blob | MediaSource)[] };
  }) => {
    if (e.target.files[0]) {
      console.log("hello");
      let image = URL.createObjectURL(e.target.files[0]);
      setImageUrl(image);
      const reader = new FileReader();
      reader.onload = function () {
        const base64String = reader.result.split(",")[1];
        setImage(base64String);
        console.log(base64String);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCreatePost = () => {
    if (imageUrl == "" || caption == "") {
      alert("Please fill all the fields");
      return;
    }
    const jsonObject = {
      caption,
      images: [image],
    };
    setLoader(true);

    createPost({
      variables: {
        createPostInput: jsonObject,
      },
    }).catch((err) => {
      console.log(err);
    }).then((res) => {
      togglePop();
      window.location.reload();
    });
    
  };

  const [seen, setSeen] = useAtom(Seen);
  const togglePop = () => {
    setSeen(!seen);
    setLoader(false);
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

        <div className="  flex items-center justify-center w-full h-[700px] flex-col p-5 bg-black">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-[#fefefe]  hover:bg-[#272727] h-[600px] m-5 bg-black"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <div
            className={
              imageUrl != ""
                ? "absolute w-[97%] top-[5.25rem] h-[440px] p-5 bg-black flex justify-center"
                : "hidden"
            }
          >
            <img
              src={imageUrl}
              className={
                imageUrl != ""
                  ? " w-[470px] h-[350px] object-contain mb-3 bg-black"
                  : "hidden"
              }
            />
          </div>

          <div className="relative my-5 w-full">
            <input
              type="text"
              id="floating_outlined"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setCaption(e.target.value)}
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Caption
            </label>
          </div>
          <div className="w-full flex justify-between m-5">
            <div
              className="p-2 lg:p-5 px-5 lg:px-10 bg-black border border-white rounded-xl text-red-500 "
              onClick={togglePop}
            >
              Cancel
            </div>
            <div
              className={!loader? " p-2 lg:p-5 bg-blue-500 rounded-xl hover:bg-blue-700 focus:ring-blue-800":"hidden"}
              onClick={handleCreatePost}
            >
              Create Post
            </div>
            <button
              disabled
              type="button"
              className={loader? "text-white bg-blue-500  focus:ring-4 focus:outline-none  font-medium rounded-xl text-sm p-2 lg:p-5  text-center mr-2 dark:bg-blue-500 hover:bg-blue-700 focus:ring-blue-800 inline-flex items-center":"hidden"}
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Creating...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
