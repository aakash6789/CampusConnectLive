import { createContext,useContext,useMemo,useEffect, useState, useCallback } from "react";


const PeerContext=createContext();

export const PeerProvider=({children})=>{
    const [remoteStream,setRemoteStream]=useState(null);
const peer=useMemo(()=>new RTCPeerConnection({
    iceServers:[
        {
            urls:[
                "stun:stun.l.google.com:19302",
                "stun:global.stun.twilio.com:3478",
            ],
        },
    ],
}),[]);

const createOffer=async()=>{
    const offer=await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
}
const createAnswer=async(offer)=>{
    await peer.setRemoteDescription(offer);
    const answer= await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
}
const setRemoteAns=async(ans)=>{
  await peer.setRemoteDescription(ans);
}

const sendStream= async(stream)=>{
  const tracks=stream.getTracks();
  for(const track of tracks){
    peer.addTrack(track,stream);
}       

}
const handleTrackEvent=useCallback((ev)=>{
    const streams=ev.streams;
    setRemoteStream(streams[0]);
},[])
// const handleNegotaion=useCallback(()=>{
//     console.log("Nego nego");
// },[]);
useEffect(()=>{
    peer.addEventListener('track',handleTrackEvent);
    // peer.addEventListener('negotationneeded',handleNegotaion);
    return ()=>{
        peer.removeEventListener('track',handleTrackEvent);
        // peer.removeEventListener('negotationneeded',handleNegotaion);
    }
},[peer,handleTrackEvent]);
return(
    <PeerContext.Provider value={{peer,createOffer,createAnswer,setRemoteAns,sendStream,remoteStream}}>
        {children}
    </PeerContext.Provider>
);
}
export default PeerContext;