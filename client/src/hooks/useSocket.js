import { useContext } from "react";
import SocketContext from "../../context/Socket";

const useSocket=()=>{
    return useContext(SocketContext);
}
export default useSocket;