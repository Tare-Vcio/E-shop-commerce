import React, { useContext } from 'react'
import UserContext from './UserContext'

function HomePageTest() {
    const user = useContext(UserContext)
    console.log(user)
    

    function Hello(){
        let xx = 123;
        user.getdata(xx)
    }
    return (
        <div>
            <button onClick={Hello}>click</button>
        </div>
    )
}

export default HomePageTest