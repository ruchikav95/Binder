import React from "react";
import "./index.css";

function Navbar() {
  return (
    <>
      <div class="fb-header-base">
      </div>
      <div class="fb-header">
        <div id="img1" class="fb-header"><img /></div>
        <div id="form1" class="fb-header">Email or Phone<br />
          <input placeholder="Email" type="mail" name="name" /><br />
          <input type="checkbox" />keep me logged in</div>

        <div id="form2" class="fb-header">Password<br />
          <input placeholder="Password" type="password" name="password" /><br />
          Forgotten your password?
          <input type="submit" class="submit1" value="login" />
        </div>
      </div>
    </>
  );
}

export default Navbar;