import React , {useContext , useState} from 'react'
import { Usercontext } from './Usercontext'
import { Redirect } from 'react-router'
import axios from 'axios'

export const Staff_profile = () => {
    const [userstate , setUserstate] = useContext(Usercontext)
    const [reply , setReply] = useState("")
    const [newStudent , setNewStudent] = useState({
        username: "", //c2k number
        profile_pic : null,
        email : "",
        name : "",
        branch : "",
        year : "",
        mobile_number : "",
        room_number : ""
    })

    const [searchStudent , setSearchstudent]  = useState("")
    const [searched_student_data , setSearched_student_data] = useState(
                                    {
                                        "registration_id":"",
                                        "email":"",
                                        "name":"",
                                        "branch":"",
                                        "profile_pic":"",
                                        "mobile_number" : "",
                                        "room_number" : "",
                                        "year" :"",
                                        "staff" : ""
                                    })
    
    const [all_complaints , setAll_complaints] = useState({complaints : []})

    function handleChange(e){
        const fieldName = e.target.name;
        const newValue = e.target.value;
        setNewStudent({...newStudent,[fieldName]:newValue});
    }

    function handlefileUpload(e){
        const newValue = e.target.files[0] ;
        setNewStudent({...newStudent,profile_pic:newValue});
    }

    function handleSubmit(e){
        e.preventDefault()
        // removing spaces from file name 
        // because of deleting issue on server
        const file_name = newStudent.profile_pic.name
        let final_file_name = ""
        for (let i=0;i<file_name.length;i++)
        {
            if(file_name.charAt(i) !== " ")
            {
                final_file_name = final_file_name+file_name.charAt(i)
            }
        }

        let form_data = new FormData();
        form_data.append('username', newStudent.username);
        form_data.append('email', newStudent.email);
        form_data.append('profile_pic', newStudent.profile_pic, final_file_name);
        form_data.append('name' , newStudent.name)
        form_data.append('branch' , newStudent.branch)
        form_data.append('mobile_number' , newStudent.mobile_number)
        form_data.append('room_number' , newStudent.room_number)
        form_data.append('year' , newStudent.year)

        axios.post("http://127.0.0.1:8000/student/create",form_data,{
                headers:{
                    'content-type': 'multipart/form-data',
                    "Authorization": "Token "+localStorage.getItem("auth_token")
                }
            }).then((res)=>{
                setNewStudent({
                    username: "", 
                    profile_pic : null,
                    email : "",
                    name : "",
                    branch : "",
                    year : "",
                    mobile_number : "",
                    room_number : ""
                })

            }).catch((err)=>{
                alert("some error occured");
                console.log(err);
            });
    }

    function search_student (event)
    {
        event.preventDefault()
        const url = "http://127.0.0.1:8000/staff/get_student/"+searchStudent
        axios.get(url,{
                headers:{
                    'content-type': 'Application/json',
                    "Authorization": "Token "+localStorage.getItem("auth_token")
                }
            }).then((res)=>{
                setSearchstudent("")
                setSearched_student_data(res.data.student)
                console.log(res.data.student)
            }).catch((err)=>{
                alert("some error occured");
                console.log(err);
            });
    }

    function delete_student (event)
    {
        event.preventDefault()
        const url = "http://127.0.0.1:8000/staff/delete_student/"+searched_student_data.registration_id
        console.log(url)
        axios.get(url,{
                headers:{
                    'content-type': 'Application/json',
                    "Authorization": "Token "+localStorage.getItem("auth_token")
                }
            }).then((res)=>{
                alert("Student deleted successfully")
                setSearchstudent("")
                setSearched_student_data({
                    "registration_id":"",
                    "email":"",
                    "name":"",
                    "branch":"",
                    "profile_pic":"",
                    "mobile_number" : "",
                    "room_number" : "",
                    "year" :"",
                    "staff" : ""
                })
            }).catch((err)=>{
                alert("some error occured");
                console.log(err);
            });
    }

    function get_all_complaints ()
    {
        const url = "http://127.0.0.1:8000/student/get_all_complaints";
        axios.get(url,{
            headers:{
                'content-type': 'Application/json',
                "Authorization": "Token "+localStorage.getItem("auth_token")
            }
        }).then((res)=>{
            let all_complaints = res.data.complaints.filter((complaint) => complaint.replies.name === "")
            setAll_complaints({complaints : all_complaints})
            console.log(all_complaints)
        }).catch((err)=>{
            alert("Some error occured");
            console.log(err);
        });
    }

    function add_reply(id,index)
    {
        const url = "http://127.0.0.1:8000/student/add_reply";
        const reply = document.getElementById(id).value
        const body = {id:id , description:reply}
        document.getElementById(id).value = "";
        axios.post(url,body,{
            headers:{
                'content-type': 'Application/json',
                "Authorization": "Token "+localStorage.getItem("auth_token")
            }
        }).then((res)=>{
            let remaining_complaints = all_complaints.complaints
            remaining_complaints.splice(index,1)
            setAll_complaints({complaints : remaining_complaints})
            console.log(res)
        }).catch((err)=>{
            alert("Some error occured");
            console.log(err);
        });
    }


    if(userstate["is_staff"])
    {
        return (
        
            <div className="row">
                <div className="col-sm-5">
                    <form className="m-3" onSubmit = {search_student}>
                        <div className ="form-row text-center m-3">  
                            <h5>Enter registration number of student to serach</h5>
                            <input type="text" placeholder="C2K191*****" className="form-control"
                            onChange = {(event) => {setSearchstudent(event.target.value)}}
                            required value = {searchStudent}/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Search..</button>
                    </form>
                    <button className="btn btn-danger btn-block" onClick = {get_all_complaints}>
                        See complaints
                    </button>
                    {searched_student_data.name ?
                    <div className = "m-2 container">
                        <p>found the student</p>
                        <img src = {"http://127.0.0.1:8000"+searched_student_data.profile_pic}/> 
                        <h2>Registration ID :{searched_student_data.registration_id}</h2>
                        <h2>Name :{searched_student_data.name}</h2>
                        <h2>Email :{searched_student_data.email}</h2>
                        <h2>Branch :{searched_student_data.branch}</h2>
                        <h2>Year :{searched_student_data.year}</h2>
                        <h2>Mobile number :{searched_student_data.mobile_number}</h2>
                        <h2>Room number :{searched_student_data.room_number}</h2>
                        <h2>Registered by :{searched_student_data.staff}</h2>
                        <button className = "btn btn-sm btn-danger" onClick = {delete_student}>
                            Delete this student
                        </button>
                    </div>
                    : null}
                </div>
                <div className="col-sm-6">
                <form className = "container roomform d-grid" onSubmit={handleSubmit}>
                        <div className="form-row text-center m-3">
                            <h5>Register new student </h5>
                        </div>
                        <div className="form-row m-3 " >
                            <label>Enter registeration number</label>
                            <input type="text" className="form-control"
                                    name = "username" 
                                    placeholder="student id"
                                    value = {newStudent.username}
                                    onChange = {handleChange} 
                                    required/>
                        </div>
                        <div className="from-row m-3">
                            <h6>Image</h6>
                            <div className="custom-file col-md-12 align-self-center mb-2">
                                <input type="file" onChange={handlefileUpload}  required 
                                        className="custom-file-input" id="customFile"
                                        accept=".png" />
                                <label className="custom-file-label" htmlFor="customFile">
                                    {newStudent.profile_pic ? newStudent.profile_pic.name : "Choose File"}
                                </label>
                            </div>
                        </div>
                        <div className="form-row m-3 " >
                            <label>Name of student</label>
                            <input type="text" className="form-control"
                                    name = "name" 
                                    placeholder="Swapnil Vitthal Chavan"
                                    value = {newStudent.name}
                                    onChange = {handleChange} 
                                    required/>
                        </div>
                        <div className="form-row m-3 " >
                            <label>Email</label>
                            <input type="email" className="form-control"
                                    name = "email" 
                                    placeholder="xyz@gmail.com"
                                    value = {newStudent.email}
                                    onChange = {handleChange} 
                                    required/>
                        </div>
                        <div className="form-row m-3 " >
                            <label>Mobile number</label>
                            <input type="number" className="form-control"
                                    name = "mobile_number" 
                                    placeholder="9999999999"
                                    value = {newStudent.mobile_number}
                                    onChange = {handleChange} 
                                    required/>
                        </div>
                        <div className="form-row m-3 " >
                            <label>Room number</label>
                            <input type="number" className="form-control"
                                    name = "room_number" 
                                    placeholder="116"
                                    value = {newStudent.room_number}
                                    onChange = {handleChange} 
                                    required/>
                        </div>
                        <div className="form-row m-3 " >
                            <label>Year</label>
                            <input type="number" className="form-control"
                                    name = "year" 
                                    placeholder="3"
                                    value = {newStudent.year}
                                    onChange = {handleChange} 
                                    required/>
                        </div>
                        <div className="form-row m-3 " >
                            <label>Branch</label>
                            <input type="text" className="form-control"
                                    name = "branch" 
                                    placeholder="Computer"
                                    value = {newStudent.branch}
                                    onChange = {handleChange} 
                                    required/>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary mb-2">Submit details</button>
                        </div>
                        </form>
                </div>
                <div className = "col-sm-12">
                    <table className="table table-hover table-striped">
                                <thead>
                                    <tr style={{backgroundColor:"#40e0d0"}}>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Reply</th>
                                        <th scope="col">Add Reply</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                   all_complaints.complaints.filter((complaint)=> complaint.replies.name === "").map( (complaint,index)=> {
                                       let id = complaint.id;
                                       return(
                                        <tr key = {complaint.id}>
                                            <th>
                                                <h4 >{complaint.title}</h4>
                                            </th>
                                            <th>
                                                <h4 >{complaint.description}</h4>
                                            </th>
                                            <th>
                                                <textarea id = {complaint.id} name="reply" cols="50" rows="3">
                                                </textarea>
                                            </th>
                                            <th>
                                                <button className="btn btn-sm btn-warning"
                                                onClick={()=>{
                                                    add_reply(id,index)
                                                    }}>
                                                    Add Reply
                                                </button>
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
