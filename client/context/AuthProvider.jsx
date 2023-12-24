import { createContext, useState , useContext} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({email: '',firstName: '',lastName: '',picture:'',phoneNo:Number});
    const [uname,setUname]=useState('');
    const [comment,setComments]=useState([]);

    return (
        <AuthContext.Provider value={{ user, setUser ,uname,setUname,comment, setComments}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;