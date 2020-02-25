import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Avatar from "@material-ui/core/Avatar";

function UserImage({ userImage }) {
  const isNotLarge = useMediaQuery("(max-width:850px)");
  return (
    <Avatar
      alt="profile"
      src={userImage}
      style={{
        width: isNotLarge ? "140px" : "200px",
        height: isNotLarge ? "140px" : "200px"
      }}
    />
  );
}

export default UserImage;
