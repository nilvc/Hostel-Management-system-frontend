import React , {useContext , useState} from 'react'
import { Usercontext } from './Usercontext'
import { Redirect } from 'react-router'
import axios from 'axios'


export const Visitor = () => {
    const [userstate , setUserstate] = useContext(Usercontext)
    const [visitor , setVisitor] = useState({name : "" , visiting_to : "" ,
                                            mobile_number:"" , purpose_of_visiting : "",
                                            number_of_visitors : ""})

    const [date_to_search , setDate ] = useState("")
    const [student_id , setStudent_id ] = useState("")
    const [searched_visitors , setSearched_Visitors ] = useState({all_visitors : []})

    const handleChange = (event) =>{
            const name  = event.target.name
            const value = event.target.value
            setVisitor({...visitor , [name]:value})
    }
    
    const handleSubmit = (event) =>
    {
        event.preventDefault()
        const url = "http://127.0.0.1:8000/visitor/add_visitor";
        axios.post(url,visitor,{
            headers:{
                'content-type': 'Application/json',
                "Authorization": "Token "+localStorage.getItem("auth_token")
            }
        }).then((res)=>{
            setVisitor({name : "" , visiting_to : "" ,
                            mobile_number:"" , purpose_of_visiting : "",
                            number_of_visitors : ""})
            alert("Visitor added successfully.")
        }).catch((err)=>{
            alert("Some error occured");
            console.log(err);
        });
    }

    const search_visitor_by_date = (event) => {
        event.preventDefault()
        const date = date_to_search.toString()
        console.log(date)
        const url = "http://127.0.0.1:8000/visitor/get_visitors_by_date/"+date;
        axios.get(url,{
            headers:{
                'content-type': 'Application/json',
                "Authorization": "Token "+localStorage.getItem("auth_token")
            }
        }).then((res)=>{
            setSearched_Visitors({"all_visitors" : res.data.visitors})
        }).catch((err)=>{
            alert("Some error occured");
            console.log(err);
        });
    }

    const search_visitor_by_student_id = (event) => {
        event.preventDefault()
        const url = "http://127.0.0.1:8000/visitor/get_visitors_by_student_id/"+student_id;
        axios.get(url,{
            headers:{
                'content-type': 'Application/json',
                "Authorization": "Token "+localStorage.getItem("auth_token")
            }
        }).then((res)=>{
            setSearched_Visitors({"all_visitors" : res.data.visitors})
        }).catch((err)=>{
            alert("Some error occured");
            console.log(err);
        });
    }


    if (userstate['is_staff'])
    {
        return (
                <div className="container-fluid">
                    <div className = "row m-3">
                        <div className = "col-sm-6">
                            <h4>Add new visitor</h4>
                            <form className="mt-3" onSubmit = {handleSubmit}>
                                <div className="form-group">
                                    <label>Name of visitor</label>
                                    <input type="text" className="form-control" 
                                    placeholder="Swapnil Chavan" value = {visitor.name}
                                    name = "name" onChange = {handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Visiting to</label>
                                    <input type="text" className="form-control"  placeholder="C2K19******"
                                    value = {visitor.visiting_to} name = "visiting_to"
                                    onChange = {handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label for="inputAddress2">Contact Number</label>
                                    <input type="text" className="form-control"  placeholder="996012****"
                                    value = {visitor.mobile_number} name = "mobile_number"
                                    onChange = {handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label for="inputAddress2">Purpose of visit</label>
                                    <input type="text" className="form-control" placeholder="Causual meet"
                                    value = {visitor.purpose_of_visiting} name = "purpose_of_visiting"
                                    onChange = {handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label for="inputAddress2">Number of visitors</label>
                                    <input type="text" className="form-control" placeholder="1"
                                    value = {visitor.number_of_visitors} name = "number_of_visitors"
                                    onChange = {handleChange}/>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Add visitor</button>
                            </form>
                        </div>
                        <div className = "col-sm-6 mt-3">
                            <form onSubmit = {search_visitor_by_date} className="my-5">
                                <h4>Search visitors by date of visiting</h4>
                                <div className="form-group">
                                    <label>Enter date</label>
                                    <input type="date" className="form-control" placeholder="11/11/2011"
                                    value = {date_to_search} name = "date_to_search"
                                    onChange ={ (event) => {setDate(event.target.value)}}/>
                                </div>
                                <button type="submit" className="btn btn-danger btn-block">Search</button>
                            </form>
                            <form className="my-5" onSubmit = {search_visitor_by_student_id}>
                                <h4>Search visitors by student id</h4>
                                <div className="form-group">
                                    <label>Enter student id</label>
                                    <input type="text" className="form-control" placeholder="C2K191*****"
                                    value = {student_id} name = "student_id"
                                    onChange ={ (event) => {setStudent_id(event.target.value)}}/>
                                </div>
                                <button type="submit" className="btn btn-danger btn-block">Search</button>
                            </form>

                        </div>
                    </div>
                    <div className="row m-3 container-fluid">
                        <table className="table table-hover table-striped">
                             <thead>
                                <tr style={{backgroundColor:"#40e0d0"}}>
                                    <th scope="col">Name of visitor</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Visiting to</th>
                                    <th scope="col">Contact Number</th>
                                    <th scope="col">Purpose of visiting</th>
                                    <th scope="col">Number of visitors</th>
                                </tr>
                            </thead>
                            {/* "id" : self.id,
            "name" : self.name,
            "date" : self.date,
            "visiting_to" : self.visiting_to.deepserialize(),
            "mobile_number" : self.mobile_num,
            "in_time" : self.in_time,
            "purpose_of_visiting" : self.purpose_of_visiting,
            "number_of_visitors" : self.number_of_visitors */}
                            <tbody>
                                {
                                    searched_visitors.all_visitors.map((visitor) => {
                                        return(
                                            <tr key = {visitor.id}>
                                                <th>
                                                    <h4 >{visitor.name}</h4>
                                                </th>
                                                <th>
                                                    <h4 >{visitor.date}</h4>
                                                </th>
                                                <th>
                                                    <h4 >{visitor.visiting_to}</h4>
                                                </th>
                                                <th>
                                                    <h4 >{visitor.mobile_number}</h4>
                                                </th>
                                                <th>
                                                    <h4 >{visitor.purpose_of_visiting}</h4>
                                                </th>
                                                <th>
                                                    <h4 >{visitor.number_of_visitors}</h4>
                                                </th>
                                            </tr>
                                        )
                                    }
                                    )
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


