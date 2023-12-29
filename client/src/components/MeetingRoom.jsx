import React, { useEffect, useCallback } from 'react'
import io from 'socket.io-client';
import { useParams } from 'react-router';
import useSocket from '../hooks/useSocket';
import usePeer from '../hooks/usePeer';
const MeetingRoom = () => {
  const {roomId}=useParams();
  const {peer,createOffer,createAnswer}=usePeer();
  const {socket} = useSocket();

  const handleUserJoined=useCallback(async(data)=>{
    const {emailId}=data;
    console.log("New user joined",emailId);
    const offer=await createOffer();
    socket.emit('call-user',{emailId,offer});
  },[createOffer,socket]);

  const handleIncomingCall=useCallback(async(data)=>{
  const {from,offer}=data;
  console.log('Incoming call from',from,offer);
  const ans=await createAnswer(offer);
  socket.emit('call-accepted',{emailId:from,ans});
  },[]);

    useEffect(()=>{
   socket.on("user-joined",handleUserJoined);
   socket.on("incoming-call",handleIncomingCall);

   return()=>{
    socket.off('user-joined',handleUserJoined);
    socket.off("incoming-call",handleIncomingCall);
   }
    },[socket,handleIncomingCall,handleUserJoined]);

  return (
    <div>
      <h1>Now playing {roomId}</h1>
      {/* <video id="localVideo" autoplay playsinline controls="false"/> */}
    </div>
  )
}

export default MeetingRoom;
