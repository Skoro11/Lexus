import {createContext,useContext,useState,useEffect} from "react"
import axios from "axios"

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [isLoggedIn, setIsLoggedIn] = useState(null)
    


useEffect(()=>{

async function checkAuth(){
    try{
        const response = await axios.get("http://localhost:3000/api/auth/me", {
      withCredentials: true
    });
    if(response.status === 200){
        setIsLoggedIn(true)
    }
    }catch(error){
        console.log("User is not signed in ")
        console.error(error)
        setIsLoggedIn(false);
    }

    

}

checkAuth()

},[])

return(
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
    </AuthContext.Provider>
)


};

export const useAuth = () => useContext(AuthContext);