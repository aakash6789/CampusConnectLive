import React, { useEffect } from 'react'
import useSocket from '../hooks/useSocket.js';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Lobby = () => {
 const {socket}=useSocket();
 const [email,setEmail]=useState();
 const [roomId,setRoomId]=useState();
 const navigate=useNavigate();
//  console.log(socket);

const handleRoomJoined=({roomId})=>{
  console.log('Room joined',roomId);
}
 const handleJoinRoom=()=>{
   socket.emit('join-room',{roomId:roomId,emailId:email});
   navigate(`/room/${roomId}`);
   
  }
  useEffect(()=>{
    socket.on('joined-room',handleRoomJoined);
  },[socket]);
  
  return (
    <div>
        <h1 className='w-[50vw] md:mr-[60vw]'>Premium video meetings now free for everyone</h1>
        <h3 className='md:mr-[30vw] mt-[10vh]'>We re-engineered the service and made a better product that Google meet, teams and Zoom meetings</h3>
      <input  type='email' value={email} onChange={e=>setEmail(e.target.value)} className='border-black border-2 px-1 mt-[10px] block' placeholder='Enter email-id'></input>
      <input type='text' value={roomId} onChange={e=>setRoomId(e.target.value)} className='border-black border-2 px-1 mt-[10px] block' placeholder='Enter code or link'></input>
      <button className='bg-black text-white mr-[1200px] mt-[20px]' onClick={handleJoinRoom}>Enter</button>
    </div>
  )
}

export default Lobby;
