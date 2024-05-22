import React, { useState} from "react";
import mediContext from "./mediContext";


const MediState =(props)=>{
  
    const [user,setUser] = useState({})
    const [accessToekn,setAccessToken] = useState("")

    function onLogin(user,token)
    {
        setUser(user)
        setAccessToken(accessToekn)
        
        localStorage.setItem("user",user)
        localStorage.setItem("accessToke",token)
    }

    function onLogout()
    {
        localStorage.removeItem("user")
        localStorage.removeItem("accessToken")
        setUser({})
        setAccessToken("")
    }


    return(
        <mediContext.Provider value={{user,accessToekn,onLogin,onLogout}}>
            {props.children}
       </mediContext.Provider>

    )

}


export default MediState;