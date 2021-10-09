import React from 'react'

export const Profile = () => {
    return (
        <div className="row">
            <div className="col-sm-3 bg-primary ">
                <p>photo</p>
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
