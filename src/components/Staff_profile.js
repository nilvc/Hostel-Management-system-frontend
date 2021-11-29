import React , {useContext , useState} from 'react'
import { Usercontext } from './Usercontext'
import { Redirect } from 'react-router'
import axios from 'axios'

export const Staff_profile = () => {
    const [userstate , setUserstate] = useContext(Usercontext)
    const [newStudent , setNewStudent] = useState({
        id: "",
        profile_pic : null

    })

    function handleChange(e){
        const fieldName = e.target.name;
        const newValue = e.target.value;
        setNewStudent({...newStudent,[fieldName]:newValue});
    }

    function handlefileUpload(e){
        const newValue = e.target.files[0] ;
        setNewStudent({...newStudent,"image":newValue});
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
        form_data.append('id', newStudent.id);
        form_data.append('profile_pic', newStudent.profile_pic, final_file_name);

        axios.post("/room/upload_report",form_data,{
                headers:{
                    'content-type': 'multipart/form-data',
                    "Authorization": "Token "+localStorage.getItem("auth_token")
                }
            }).then((res)=>{
                setNewStudent({
                    id : "",
                    profile_pic:null
                })

            }).catch((err)=>{
                alert("some error occured");
                console.log(err);
            });
    }



    if(userstate["is_staff"])
    {
        return (
        
            <div className="row">
                <div className="col-sm-6">
                    <p>I am staff</p>
                    <button className="btn btn-secondary btn-block pl-3">Edit profile</button>
                    <button className="btn btn-secondary btn-block">See complaints</button>
                    <button className="btn btn-secondary btn-block">More stuff</button>
                </div>
                <div className="col-sm-6">
                <form className = "container roomform d-grid" onSubmit={handleSubmit}>
                        <div className="form-row text-center m-3">
                            <h5>Register new student </h5>
                        </div>
                        <div className="form-row m-3 " >
                            
                            <input type="text" className="form-control"
                                    name = "id" 
                                    placeholder="student id"
                                    value = {newStudent.id}
                                    onChange = {handleChange} 
                                    required/>
                        </div>
                        <div className="from-row m-3">
                            <h6>Image</h6>
                            <div className="custom-file col-md-12 align-self-center mb-2">
                                <input type="file" onChange={handlefileUpload}  required 
                                        className="custom-file-input" id="customFile"
                                        accept=".png"/>
                                <label className="custom-file-label" htmlFor="customFile">
                                    {newStudent.profile_pic ? newStudent.profile_pic.name : "Choose File"}
                                </label>
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary mb-2">Submit details</button>
                        </div>
                        </form>
                </div>
            </div>
        )
    }
    else{
        return <Redirect to="/" />
    }
    
}
