import { MouseEventHandler } from "react";

export default function SingleChatDisplay(props: {
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
    name: string; img_url: string | undefined; 
}) {
  return (
    <div className="flex items-center gap-4 p-2 border border-gray-500 rounded-xl mb-2 cursor-pointer" onClick={props.onClick}>
      <img className="w-12 h-12 rounded-[50%] border border-gray-500" src={props.img_url}></img>
      <h1>{props.name}</h1>
    </div>
  )
}
