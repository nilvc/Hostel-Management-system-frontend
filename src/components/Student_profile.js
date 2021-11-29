import React , {useContext} from 'react'
import { Usercontext } from './Usercontext'
import { Redirect } from 'react-router'

export const Student_profile = () => {
    const [userstate , setUserstate] = useContext(Usercontext)
    if(userstate["is_student"])
    {
        return (
        
            <div className="row">
                <div className="col-sm-3 bg-primary ">
                    <p>I am student</p>
                    <button className="btn btn-secondary btn-block pl-3">Edit profile</button>
                    <button className="btn btn-secondary btn-block">See complaints</button>
                    <button className="btn btn-secondary btn-block">More stuff</button>
                </div>
                <div className="col-sm-9 bg-seconday">
                    <p>rest info</p>
                </div>
            </div>
        )
    }
    else{
        return <Redirect to="/" />
    }
    
}
