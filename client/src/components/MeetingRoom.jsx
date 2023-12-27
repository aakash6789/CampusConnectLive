import React from 'react'
import io from 'socket.io-client';
const MeetingRoom = () => {
    const socket = io('http://localhost:3000');
  return (
    <div>
      <h1>Now playing</h1>
      <video id="localVideo" autoplay playsinline controls="false"/>
    </div>
  )
}

export default MeetingRoom;
