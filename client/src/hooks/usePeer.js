import { useContext } from "react";
import PeerContext from "../../context/Peer";
const usePeer=()=>{return useContext(PeerContext)};
export default usePeer;