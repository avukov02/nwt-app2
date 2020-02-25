import React from "react";
import logo1 from "../content/cover.png";
import logo2 from "../content/tigr3.png";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function Logo(props) {
  const isNotLarge = useMediaQuery("(max-width:700px)");
  const logo = isNotLarge ? logo2 : logo1;
  return (
    <div>
      <img
        src={logo}
        alt="Logo"
        style={{ width: isNotLarge ? "60px" : "200px", paddingTop: "5px" }}
      />
    </div>
  );
}

export default Logo;
