import React, { useState} from "react";
import mediContext from "./mediContext";

const MediState =(props)=>{
  
    const [user,setUser] = useState(JSON.parse(sessionStorage.getItem('user')))
    const [accessToken,setAccessToken] = useState(sessionStorage.getItem("accessToken"))

    function onLogin(user,token)
    {
        if(user!=undefined)
        {
            setUser(user)
            sessionStorage.setItem("user",JSON.stringify(user))
        }

        if(token!=undefined)
        {
            setAccessToken(token)
            sessionStorage.setItem("accessToken",token)
        }
       
    }

    function onLogout()
    {
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("accessToken")
        setUser(null)
        setAccessToken("")
    }


    return(
        <mediContext.Provider value={{user,accessToken,onLogin,onLogout}}>
            {props.children}
       </mediContext.Provider>

    )

}


export default MediState;