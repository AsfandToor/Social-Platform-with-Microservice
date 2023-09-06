import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";

export default function Message(props: { isUserSender: any; message: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) {
  return (
    <div className={`flex px-2 ${props.isUserSender? 'justify-start': 'justify-end'}`}>
    <div className={`w-fit py-1 px-2 rounded-lg my-1 ${props.isUserSender?'bg-gray-500 rounded-bl-none':'bg-blue-500 rounded-br-none'}`}>
        <p>{props.message}</p>
    </div>
    </div>
  )
}
