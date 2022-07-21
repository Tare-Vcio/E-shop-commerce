import React from 'react'
import HomePageTest from './HomePageTest'
import { UserContext } from './UserContext'
import { useState } from 'react'

function AppTest() {
    const user = {name: 'Hieu', loggedIn:true}
    const [datas, setDatas] = useState()
    function getData(x){
        setDatas(x)
    }

  return (
    <UserContext.Provider value={{
        user:user,
        getData: getData
        }}>
        <HomePageTest/>
    </UserContext.Provider>
  )
}

export default AppTest