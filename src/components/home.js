import React  , {useContext} from 'react'
import staff_2 from './images/staff_3.jpeg'

import './Home.css'

const Home = () => {
    return (
        <div>
            <div style = {{backgroundColor : "#808080"}}>      
                <div className="container" >
                    <div className="row">
                        <div className="col-md-4">
                                <div className="card" style={{width: "20rem"}}>
                                    <img src={staff_2} className="card-img-top" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title">Head Warden</h5>
                                        <span className = "btn btn-block btn-info text-light">Name Of Warden</span>
                                        <span className = "btn btn-block btn-secondary text-light">9960996053</span>
                                        <span className = "btn btn-block btn-secondary text-light">warden@gmail.com</span>
                                    </div>
                                </div>
                        </div>    
                        <div className="col-md-4">
                                <div className="card" style={{width: "20rem"}}>
                                    <img src={staff_2} className="card-img-top" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title">Warden</h5>
                                        <span className = "btn btn-block btn-info text-light">Name Of Warden</span>
                                        <span className = "btn btn-block btn-secondary text-light">9960996053</span>
                                        <span className = "btn btn-block btn-secondary text-light">warden@gmail.com</span>
                                    </div>
                                </div>
                        </div>    
                        <div className="col-md-4">
                                <div className="card" style={{width: "20rem"}}>
                                    <img src={staff_2} className="card-img-top" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title">Warden</h5>
                                        <span className = "btn btn-block btn-info text-light">Name Of Warden</span>
                                        <span className = "btn btn-block btn-secondary text-light">9960996053</span>
                                        <span className = "btn btn-block btn-secondary text-light">warden@gmail.com</span>
                                    </div>
                                </div>
                        </div>    
                    </div>
                </div>
            </div>
            <div style = {{backgroundColor : "#d3d3d3"}}>
                <div style = {{backgroundColor : "#b2beb5"}} className="container-fluid" >
                    <h2 className="text-center">
                        Boys Hostel
                    </h2>
                    <span>Total accommodation: 67 Rooms (with double occupancy)</span>
                    <table class="table table-bordered table-hover">
                        <tbody>
                            <tr>
                                <th scope="row">FE/SE(Direct)/ME-I</th>
                                <td>66 students</td>    
                            </tr>
                            <tr>
                                <th scope="row">SE</th>
                                <td>34 studentsk</td>
                            </tr>
                            <tr>
                                <th scope="row">TE</th>
                                <td>34 students</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style = {{backgroundColor : "#d3d3d3"}}>
                    <h2 className="text-center">
                        Girls Hostel
                    </h2>
                    <span>Total accommodation: 67 Rooms (with double occupancy)</span>
                    <table class="table table-bordered table-hover">
                        <tbody>
                            <tr>
                                <th scope="row">FE/SE(Direct)/ME-I</th>
                                <td>66 students</td>    
                            </tr>
                            <tr>
                                <th scope="row">SE</th>
                                <td>34 studentsk</td>
                            </tr>
                            <tr>
                                <th scope="row">TE</th>
                                <td>34 students</td>
                            </tr>
                        </tbody>
                    </table>
                    <h4>Charges :- </h4>
                    <h5>1) Double occupancy with attached WC: Rs. 1,20,000</h5>
                    <h5>2) Double occupancy with Common WC: Rs. 1,10,000</h5>
                    <h5>3) Refundable Deposit: Rs. 15,000</h5>
                </div>
            </div>
        </div>
    )
}

export default Home
