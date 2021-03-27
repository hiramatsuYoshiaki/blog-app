import React from 'react'
import './assets/styles/style.scss'
import { Header, Footer } from './templates/index'
import Router from './Router'
// import HeaderTransitionTest from './templates/HeaderTransitionTest'
// import RouterTransitionTest from './RouterTransitionTest'


function App() {
  
  return (
    <div className="l-app-wrape"> 
      <Header />
      <Router />
      <Footer />

      {/* <HeaderTransitionTest />
      <RouterTransitionTest/> */}
      
    </div>
  );
} 

export default App;
