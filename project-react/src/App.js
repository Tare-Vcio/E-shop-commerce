import React from 'react';
import { UserContext } from './components/Context/UserContext';
import Head from './components/Layout/Head'
// import Slider from './components/Layout/Slider'
import MenuLeft from './components/Layout/MenuLeft'
import Footer from './components/Layout/Footer'
import { useLocation } from 'react-router-dom';
function App(props) {
  let param1 = useLocation();
  function getQty() {
    console.log("Day la get so luong")
  }

  return (
    <>
      <UserContext.Provider value={{
        getQty: getQty,
      }}>
        <Head />
        <section>
          <div className='container'>
            <div className='row'>
              {param1['pathname'].includes("account") ? '' : <MenuLeft />}
              {props.children}
            </div>
          </div>
        </section>
        <Footer />
      </UserContext.Provider>
    </>

  );
}

export default App;
