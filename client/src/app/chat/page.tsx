"use client"

import { useState } from "react";
import Message from "./components/Message"
import SingleChatDisplay from "./components/SingleChatDisplay"

export default function page() {
  
  const data = [{
    "id": 1,
    "username": "gstebbing0",
    "img_url": "https://robohash.org/officiisestquidem.png?size=50x50&set=set1"
  }, {
    "id": 2,
    "username": "mrubenfeld1",
    "img_url": "https://robohash.org/natusimpeditautem.png?size=50x50&set=set1"
  }, {
    "id": 3,
    "username": "rcotmore2",
    "img_url": "https://robohash.org/sintinnon.png?size=50x50&set=set1"
  }, {
    "id": 4,
    "username": "jchastanet3",
    "img_url": "https://robohash.org/magnilaudantiumdoloremque.png?size=50x50&set=set1"
  }, {
    "id": 5,
    "username": "spaule4",
    "img_url": "https://robohash.org/veniamvitaeut.png?size=50x50&set=set1"
  }, {
    "id": 6,
    "username": "elongcaster5",
    "img_url": "https://robohash.org/nonnesciuntomnis.png?size=50x50&set=set1"
  }, {
    "id": 7,
    "username": "pgregolin6",
    "img_url": "https://robohash.org/voluptatibusfugitcorrupti.png?size=50x50&set=set1"
  }, {
    "id": 8,
    "username": "gadan7",
    "img_url": "https://robohash.org/dolornihilamet.png?size=50x50&set=set1"
  }, {
    "id": 9,
    "username": "jvidloc8",
    "img_url": "https://robohash.org/consequunturdolorumet.png?size=50x50&set=set1"
  }, {
    "id": 10,
    "username": "tfairbairn9",
    "img_url": "https://robohash.org/velmollitiaarchitecto.png?size=50x50&set=set1"
  }]

  const current_uid = "user-1";
  const [currChat, setCurrChat] = useState({
    name: "gstebbing0",
    img_url: "https://robohash.org/officiisestquidem.png?size=50x50&set=set1"
  });

  // setCurrChat({
  //   name: "gstebbing0",
  //   img_url: "https://robohash.org/officiisestquidem.png?size=50x50&set=set1"
  // })

  const chat = {
    "chatId": "chat-12345",
    "participants": [
      {
        "userId": "user-1",
        "username": "Alice"
      },
      {
        "userId": "user-2",
        "username": "Bob"
      }
    ],
    "messages": [
      {
        "messageId": "message-1",
        "userId": "user-1",
        "text": "Hi Bob!",
        "timestamp": "2023-09-01T10:00:00Z"
      },
      {
        "messageId": "message-2",
        "userId": "user-2",
        "text": "Hello Alice!",
        "timestamp": "2023-09-01T10:05:00Z"
      },
      {
        "messageId": "message-3",
        "userId": "user-1",
        "text": "How are you?",
        "timestamp": "2023-09-01T10:10:00Z"
      },
      {
        "messageId": "message-4",
        "userId": "user-2",
        "text": "I'm good, thanks! How about you?",
        "timestamp": "2023-09-01T10:15:00Z"
      },
      {
        "messageId": "message-5",
        "userId": "user-1",
        "text": "I'm doing well too!",
        "timestamp": "2023-09-01T10:20:00Z"
      },
      {
        "messageId": "message-6",
        "userId": "user-2",
        "text": "That's great to hear!",
        "timestamp": "2023-09-01T10:25:00Z"
      },
      {
        "messageId": "message-7",
        "userId": "user-1",
        "text": "What have you been up to?",
        "timestamp": "2023-09-01T10:30:00Z"
      },
      {
        "messageId": "message-8",
        "userId": "user-2",
        "text": "Not much, just work and stuff.",
        "timestamp": "2023-09-01T10:35:00Z"
      },
      {
        "messageId": "message-9",
        "userId": "user-1",
        "text": "Same here, busy week!",
        "timestamp": "2023-09-01T10:40:00Z"
      },
      {
        "messageId": "message-10",
        "userId": "user-2",
        "text": "It happens! Anything exciting coming up?",
        "timestamp": "2023-09-01T10:45:00Z"
      },
      {
        "messageId": "message-11",
        "userId": "user-1",
        "text": "Not sure yet. Maybe a weekend trip.",
        "timestamp": "2023-09-01T10:50:00Z"
      },
      {
        "messageId": "message-12",
        "userId": "user-2",
        "text": "Sounds fun! Let me know if you need recommendations.",
        "timestamp": "2023-09-01T10:55:00Z"
      },
      {
        "messageId": "message-13",
        "userId": "user-1",
        "text": "Will do, thanks!",
        "timestamp": "2023-09-01T11:00:00Z"
      },
      {
        "messageId": "message-14",
        "userId": "user-2",
        "text": "You're welcome. Have a great day!",
        "timestamp": "2023-09-01T11:05:00Z"
      },
      {
        "messageId": "message-15",
        "userId": "user-1",
        "text": "You too, Bob! Talk to you later.",
        "timestamp": "2023-09-01T11:10:00Z"
      }
    ]
  }
  
  
  const HandleOnChatClick = (id: number) => {
    const clickedUser = data.find((user) => user.id === id);

    if (clickedUser) {
      setCurrChat({
        name: clickedUser.username,
        img_url: clickedUser.img_url
      });
    }
  }

  
  return (
    <div className="grid grid-cols-4 text-center bg-white">
      <div className="h-screen col-span-1 border-2 overflow-y-auto">
        <h1 className="text-2xl mt-2">Messages</h1>
        <div className="p-2">
          {data.map((elem)=>{
             return (
              <SingleChatDisplay key={elem.id} img_url={elem.img_url} name={elem.username} onClick={() => HandleOnChatClick(elem.id)}/>
             )
          })}
        </div>
      </div>
      <div className="h-screen col-span-3 border-2">
        <div className="h-[10%] w-full border-b-2 flex items-center justify-center gap-2">
          <img className="h-10 w-10 rounded-[36px] border border-gray-500" src={currChat.img_url}></img>
          <h1>{currChat.name}</h1>
        </div>
        <div className="h-[80%] p-2 overflow-y-auto">
          {chat.messages.map((msg) => {
            return (
              <Message key={msg.messageId} isUserSender={msg.userId === current_uid} message = {msg.text}/>
            )
          })}
        </div>
        <div className="h-[10%] flex gap-2 justify-center border py-2">
          <input className="border border-gray-200 rounded-lg px-2 py-1 w-1/2" type="text" placeholder="Enter your message here"/>
          <button className="bg-blue-500 text-white rounded-lg py-1 px-2">Send</button>
        </div>
      </div>
    </div>
  )
}
