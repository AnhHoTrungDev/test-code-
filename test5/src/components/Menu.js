import React from "react";
import { Link } from "react-router-dom";

export const Menu = props => {
  const handlerClickLogOut = () => {
    localStorage.clear();
    return props.history.push("/");
  };

  return (
    <div>
      <h3>Menu</h3>
      <ul id="menu">
        <li>
          <Link to={"/dashboard"}>/dashboard</Link>
        </li>
        <li>
          <Link to={"/setting"}>/setting</Link>
        </li>
        <li>
          <Link to={"/functions"}>/functions</Link>
        </li>
        <li>
          <Link to={"/functions/foo"}>/functions/foo</Link>
        </li>

        <li>
          <button onClick={handlerClickLogOut} data-test="logout__btn">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};
