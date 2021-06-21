import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
      <div className = { 'nav' }>
        <h2><Link to='/'>February</Link></h2>
        {/* <h2><Link to='/current'>March</Link></h2> */}
      </div>
    );
  }


export default NavBar;
