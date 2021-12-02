import {React , useState , createContext} from "react";


export const Usercontext = createContext();


export const Userprovider = (props) => {
    let id = localStorage.getItem("id")
    console.log("id when context loads is",id)
    let is_user_student = false;
    let is_user_staff = false;
    let is_user_auth = false;
    const token = localStorage.getItem("auth_token")
    console.log(id,typeof(id))
    if(token)
    {
        is_user_auth = true;
    }
    if(id === "22102000")
    {
        is_user_student = true;
    }
    if(id === "17042004")
    {
        is_user_staff = true;
    }
    const [userstate , setUserstate] = useState(
        {
            is_student : is_user_student,
            is_staff : is_user_staff,
            is_autenticated : is_user_auth
        }
        
    )
    return (
        <div>
            <Usercontext.Provider value={[userstate, setUserstate]}>
                {props.children}
            </Usercontext.Provider>
        </div>
    )
}
