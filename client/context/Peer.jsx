import { createContext,useContext,useMemo } from "react";

const PeerContext=createContext();

export const PeerProvider=({children})=>{
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
return(
    <PeerContext.Provider value={{peer,createOffer,createAnswer,setRemoteAns}}>
        {children}
    </PeerContext.Provider>
);
}
export default PeerContext;