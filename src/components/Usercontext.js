import {React , useState , createContext} from "react";


export const Usercontext = createContext();


export const Userprovider = (props) => {
    const [userstate , setUserstate] = useState(
        {
            is_student : false,
            is_staff : false,
            is_autenticated : false,
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
