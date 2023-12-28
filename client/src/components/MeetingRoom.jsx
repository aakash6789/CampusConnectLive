import React, { useEffect } from 'react'
import io from 'socket.io-client';
import { useParams } from 'react-router';
import useSocket from '../hooks/useSocket';
import usePeer from '../hooks/usePeer';
const MeetingRoom = () => {
  const {roomId}=useParams();
  const {peer,createOffer}=usePeer();

  const handleUserJoined=async(data)=>{
    const {emailId}=data;
    console.log("New user joined",emailId);
    const offer=await createOffer();
  };
    const {socket} = useSocket();
    useEffect(()=>{
   socket.on("user-joined",handleUserJoined);
    },[socket]);

  return (
    <div>
      <h1>Now playing {roomId}</h1>
      {/* <video id="localVideo" autoplay playsinline controls="false"/> */}
    </div>
  )
}

export default MeetingRoom;
