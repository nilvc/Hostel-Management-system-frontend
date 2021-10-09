import React  , {useContext} from 'react'
import { Usercontext } from './Usercontext'

const Home = () => {
    let value = useContext(Usercontext);
    return (
        <div>
            <h1>Home</h1>
            <p>All info about hostel , admins , available rooms, fee structure will be shown here </p>
        </div>
    )
}

export default Home
