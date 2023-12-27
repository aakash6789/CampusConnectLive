import React from 'react'
import io from 'socket.io-client';
import { useParams } from 'react-router';
import useSocket from '../hooks/useSocket';
const MeetingRoom = () => {
  const {roomId}=useParams();
    const socket = io('http://localhost:3000');
  return (
    <div>
      <h1>Now playing {roomId}</h1>
      <video id="localVideo" autoplay playsinline controls="false"/>
    </div>
  )
}

export default MeetingRoom;
