import React from "react"


import Link from 'next/link'
export const Layout =(props)=>{
  const Addfriend=()=>{
    return <li className="nav-item mt-1 ms-5" id = "test1" >
      <form className="d-inline-flex center-block" id = 'test1'>
        
        <input type="text" className="form-control" id="friendid" name="friendid"></input>
     
      </form>
      </li>
  }
    return (
        <><nav className="navbar navbar-expand-lg "  >
        <div className="container-fluid"id='test1' >
        <img src="/museconnect.png"  width="60" height="60" ></img>
    
          <div className="collapse navbar-collapse" id='test1'  >
            <ul className="navbar-nav me-auto " id = 'test1' >
              <li className="nav-item" >
                <a className="nav-link fs-5 " id='test1' aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5 " id='test1' href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-5" id='test1' href="#">Friends</a>
              </li>
              <Addfriend/>
             
              
            </ul>
            <div class="ratio ratio-1x1 rounded-circle overflow-hidden" id="pic1">
                <img src="/profilenoob.png"  ></img>
            </div>
           
            <span className="fs-4 navbar-text fw-normal ms-3 " id='test1'>
             {props.yoyo}
            </span>
          </div>
        </div></nav></>
    )
}