import React, { useEffect ,useCallback} from 'react'
import { useSocket } from '../../context/SocketProvider';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Lobby = () => {
  const socket = useSocket();
 const [email,setEmail]=useState("");
 const [room,setRoom]=useState("");
 const navigate=useNavigate();


const handleJoinRoom = useCallback(
  (data) => {
    const { email, room } = data;
    navigate(`/room/${room}`);
  },
  [navigate]
);

const handleSubmitForm=useCallback((e)=>{
  e.preventDefault();
  socket.emit('room:join',{email,room})}  ,
  [socket,email,room]);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);
  
  return (
    <div>
        <h1 className='w-[50vw] md:mr-[60vw]'>Premium video meetings now free for everyone</h1>
        <h3 className='md:mr-[30vw] mt-[10vh]'>We re-engineered the service and made a better product that Google meet, teams and Zoom meetings</h3>
        <form onSubmit={handleSubmitForm}>
      <input  type='email' value={email} onChange={e=>setEmail(e.target.value)} className='border-black border-2 px-1 mt-[10px] block' placeholder='Enter email-id'></input>
      <input type='text' value={room} onChange={e=>setRoom(e.target.value)} className='border-black border-2 px-1 mt-[10px] block' placeholder='Enter code or link'></input>
      <button className='bg-black text-white mr-[1200px] mt-[20px]' >Enter</button>
      </form>
    </div>
  )
}

export default Lobby;
