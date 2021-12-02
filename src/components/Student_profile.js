import React , {useContext , useState} from 'react'
import { Usercontext } from './Usercontext'
import { Redirect } from 'react-router'
import axios from 'axios'

export const Student_profile = () => {
    const [userstate , setUserstate] = useContext(Usercontext)
    const [password , setPassword]   = useState("")
    const [complaint , setComplaint]   = useState({title:"" , description : ""})
    const [all_complaints , set_All_complaint]   = useState({complaints : []})
    
    function update_password()
    {
        console.log("done")
    }

    function handle_complaint_change(event)
    {
        const name  = event.target.name;
        const value  = event.target.value;
        setComplaint({...complaint , [name]:value})

    }

    function add_complaint(event)
    {
        event.preventDefault()
        const url = "http://127.0.0.1:8000/student/add_complaint";
        axios.post(url,complaint,{
            headers:{
                'content-type': 'Application/json',
                "Authorization": "Token "+localStorage.getItem("auth_token")
            }
        }).then((res)=>{
            setComplaint({title:"" , description : ""})
        }).catch((err)=>{
            alert("Some error occured");
            console.log(err);
        });
    }

    function get_my_complaints()
    {
        const url = "http://127.0.0.1:8000/student/get_my_complaints";
        axios.get(url,{
            headers:{
                'content-type': 'Application/json',
                "Authorization": "Token "+localStorage.getItem("auth_token")
            }
        }).then((res)=>{
            set_All_complaint({complaints : res.data.complaints})
            console.log(res.data.complaints)
        }).catch((err)=>{
            alert("Some error occured");
            console.log(err);
        });

    }
    if(userstate["is_student"])
    {
        return (
            <div className = "container-fluid">
                <div className="row">
                    <div className="col-sm-6 ">
                        <form className="m-3" onSubmit = {add_complaint}>
                            <div className = "form-row text-center m-1">
                                <h6>Subject of complaint</h6>
                                <input value={complaint.title} name = "title"  type = "text" className="form-control"
                                onChange = {handle_complaint_change} required/>
                            </div>
                            <div className = "form-row text-center m-1">
                                <h6>Description of complaint</h6>
                                <input value={complaint.description} name = "description" type = "text" className="form-control"
                                onChange = {handle_complaint_change} required/>
                            </div>
                            <button type = "submit" className="btn btn-danger btn-block">
                                Add complaints
                            </button>
                        </form>
                    </div>
                    <div className = "col-sm-6">
                        <form className="m-3" onSubmit = {update_password}>
                            <div className = "form-row text-center m-3">
                                <h6>Update your password</h6>
                                <input value={password} required type = "password" className="form-control"
                                onChange = {(event) => {setPassword(event.target.value)}}/>
                                <button className="btn btn-success btn-block m-2">Update password</button>
                            </div>
                        </form>
                        <button className="btn btn-secondary btn-block" onClick={get_my_complaints}>
                            See my complaints
                        </button>
                    </div>
                    
                </div>
                <div className="row">
                    <table className="table table-hover table-striped">
                                <thead>
                                    <tr style={{backgroundColor:"#40e0d0"}}>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Reply</th>
                                        <th scope="col">Replied by</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    all_complaints.complaints.map(
                                        (complaint) => { return (
                                                                    <tr key = {complaint.id}>
                                                                        <th>
                                                                            <h4 >{complaint.title}</h4>
                                                                        </th>
                                                                        <th>
                                                                            <h4 >{complaint.description}</h4>
                                                                        </th>
                                                                        <th>
                                                                            {complaint.replies.name === "" ?
                                                                             <h4>No reply yet</h4>
                                                                            :<h4 >
                                                                                {complaint.replies.description}
                                                                            </h4>}
                                                                            
                                                                        </th>
                                                                        <th>
                                                                            {complaint.replies.name === "" ?
                                                                             <h4>No reply yet</h4>
                                                                            :<h4 >
                                                                                {complaint.replies.name}
                                                                            </h4>}
                                                                            
                                                                        </th>
                                                                    </tr>
                                                                    )
                                                            })
                                } 
                                </tbody>
                    </table>
                
                </div>
            </div>

        )
    }
    else{
        return <Redirect to="/" />
    }
    
}