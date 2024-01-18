import React, { useEffect, useCallback, useState } from 'react'
import io from 'socket.io-client';
import { useParams } from 'react-router';
import { useSocket } from '../../context/SocketProvider';
import usePeer from '../hooks/usePeer';
import peer from '../../services/Peer';
import ReactPlayer from 'react-player';
const MeetingRoom = () => {
 
//   // const {peer,createOffer,createAnswer,setRemoteAns,sendStream,remoteStream}=usePeer();
//   const {socket} = useSocket();
//   const [myStream, setMyStream]=useState(null);
//   const [remoteSocketId,setRemoteSocketId]=useState(null);

//   const handleUserJoined=useCallback(({email,id})=>{
//     console.log(`Email ${email} has joined the room`);
//     setRemoteSocketId(id);
//   },[]);

//   const handleCallUser=useCallback(async()=>{
//     const stream=await navigator.mediaDevices.getUserMedia({audio:true,video:true});
//     const offer=await Peer.getOffer();
//     socket.emit("user:call",{to:remoteSocketId,offer});
//     setMyStream(stream);
//   },[]);

//   const handleIncomingCall=useCallback(({from,offer})=>{
//     console.log("ye");
//     console.log(`Incoming call `,from,offer);
//   },[]);


// useEffect(()=>{
//   socket.on("incoming:call",handleIncomingCall);
//   socket.on("user:joined",handleUserJoined);
//   return()=>{
//     socket.off("user:joined",handleUserJoined);
//     socket.off("incoming:call",handleIncomingCall);
//   }
// },[socket,handleUserJoined,handleIncomingCall]);
const {room}=useParams();
const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div>
      <h1>Now playing {room}</h1>
      {/* <video id="localVideo" autoplay playsinline controls="false"/> */}
      {myStream && <button onClick={sendStreams}>Send Stream</button>}
      {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
      {remoteSocketId ? <h1>Connected</h1> : <h1>Not</h1>}
      {myStream && <div>
        <h3>My stream</h3>
      <ReactPlayer url={myStream} playing muted></ReactPlayer>
        </div>}
      {/* <ReactPlayer url={remoteStream} playing/> */}
      {/* {remoteSocketId &&  <button onClick={handleCallUser}>Send video</button>} */}
      {remoteStream && (
        <>
          <h1>Remote Stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={remoteStream}
          />
        </>
      )}
     
    </div>
  )
}

export default MeetingRoom;
