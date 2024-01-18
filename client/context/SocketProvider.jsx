
// import { createContext, useState , useContext, React, useMemo} from "react";
// import { io } from "socket.io-client";

// const SocketContext=createContext({});

// export const SocketProvider=({children})=>{
//     const socket= useMemo(()=>io("http://localhost:3001"),[]);
//     return(
//         <SocketContext.Provider value={{socket}}>
//             {children}
//         </SocketContext.Provider>
//     );

// }
// export default SocketContext;
import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const socket = useMemo(() => io("http://localhost:3001"), []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
