import React, { useState} from "react";
import mediContext from "./mediContext";

const MediState =(props)=>{
  
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [accessToken,setAccessToken] = useState(localStorage.getItem("accessToken"))

    function onLogin(user,token)
    {
        if(user!=undefined)
        {
            setUser(user)
            localStorage.setItem("user",JSON.stringify(user))
        }

        if(token!=undefined)
        {
            setAccessToken(token)
            localStorage.setItem("accessToken",token)
        }
       
    }

    function onLogout()
    {
        localStorage.removeItem("user")
        localStorage.removeItem("accessToken")
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