import React , {useState , useContext} from 'react'
import axios from 'axios';
import { Usercontext } from './Usercontext';


export const Navbar = () => {

    const [userstate ,setUserstate] = useContext(Usercontext);
    const is_autenticated = userstate["is_autenticated"] ;
    const is_staff = userstate["is_staff"]
    const is_student = userstate["is_student"]

    const [loginfields,setLoginFields] = useState({
        username:"",
        password:""
    });

    const handleLoginChange = (e) => {
        const fieldName = e.target.name;
        const newValue = e.target.value;
        setLoginFields({...loginfields,[fieldName]:newValue});
    }


    const handleLogin = (event) => {
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/api/auth/login",loginfields,{
            headers:{
                "content-type":"application/json"
            }
        }).then((response)=>{
            localStorage.setItem("auth_token",response.data.token);
            localStorage.setItem("username",response.data.user.username);
            setUserstate({
                is_autenticated : true,
                is_staff : !response.data.is_student,
                is_student : response.data.is_student
            })

        }).catch((err)=>{
            alert("Invalid credentials !!");
            console.log(err);
        });
        setLoginFields({
            username:"",
            password:""
        })
    }

    const handleLogout = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("auth_token");
        console.log(token);
        axios.post("http://127.0.0.1:8000/api/auth/logout",loginfields,{
            headers:{
                "content-type":"application/json",
                "Authorization":`Token ${token}`
            }
        }).then((res)=>{
            localStorage.clear();
            setUserstate({
                is_autenticated : false,
                is_staff : false,
                is_student : false
            })
            alert("Logout successfull.")
        }).catch((err)=>{
            alert("Invalid credentials !!");
            console.log(err);
        });
        setLoginFields({
            username:"",
            password:""
        })
    }


    const loginform = <form className="form-inline my-2 my-lg-0" onSubmit = {handleLogin}>
                        <input className="form-control mr-sm-2" 
                            type="text" placeholder="Username" 
                            aria-label="Search" 
                            name = "username"
                            value = {loginfields.username} 
                            onChange = {handleLoginChange}/>
                        <input className="form-control mr-sm-2" 
                            type="password" placeholder="Password" 
                            aria-label="Search"
                            name = "password"
                            value = {loginfields.password} 
                            onChange = {handleLoginChange}/>
                        <button className="btn btn-outline-success btn-sm my-2 my-sm-0" type="submit">Login</button>
                    </form>
    
    const only_staff = <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Register Students</a>
                            </li>
                        </ul>

    const only_student = <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link" href="/"></a>
                            </li>
                        </ul>
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    {!is_autenticated && loginform}
                    {is_staff && only_staff}
                    {is_autenticated && <button className="btn btn-outline-success btn-sm my-2 my-sm-0" 
                                        onClick={handleLogout}>Logout</button> }
                    
                </div>
            </nav>
        </div>
    )
}
