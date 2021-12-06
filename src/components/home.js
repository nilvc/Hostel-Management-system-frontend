import React  , {useContext} from 'react'
import { Usercontext } from './Usercontext'
import './Home.css'

const Home = () => {
    let value = useContext(Usercontext);
    return (
        <div style = {{backgroundColor : "#808080"}}>             
            <div className="container" >
                <div className="row">
                    <div className="col-md-4">
                            <div className="card" style={{width: "20rem"}}>
                                <img src="https://tinyurl.com/4zjf276d" className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">Head Warden</h5>
                                    <span className = "btn btn-block btn-info text-light">Swapnil Vitthal Chavan</span>
                                    <span className = "btn btn-block btn-secondary text-light">9960996053</span>
                                    <span className = "btn btn-block btn-secondary text-light">warden@gmail.com</span>
                                </div>
                            </div>
                    </div>    
                    <div className="col-md-4">
                            <div className="card" style={{width: "20rem"}}>
                                <img src="https://tinyurl.com/4zjf276d" className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">Warden</h5>
                                    <span className = "btn btn-block btn-info text-light">Swapnil Vitthal Chavan</span>
                                    <span className = "btn btn-block btn-secondary text-light">9960996053</span>
                                    <span className = "btn btn-block btn-secondary text-light">warden@gmail.com</span>
                                </div>
                            </div>
                    </div>    
                    <div className="col-md-4">
                            <div className="card" style={{width: "20rem"}}>
                                <img src="https://tinyurl.com/4zjf276d" className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">Warden</h5>
                                    <span className = "btn btn-block btn-info text-light">Swapnil Vitthal Chavan</span>
                                    <span className = "btn btn-block btn-secondary text-light">9960996053</span>
                                    <span className = "btn btn-block btn-secondary text-light">warden@gmail.com</span>
                                </div>
                            </div>
                    </div>    
                </div>
            </div>
        </div>
    )
}

export default Home
