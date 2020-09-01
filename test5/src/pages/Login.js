import React, { useRef } from "react";

const Login = props => {
  const inputEl = useRef("");
  const handerClickLogin = e => {
    if (inputEl.current.value === "123") {
      localStorage.setItem("token", "abcasdjhajshdjashjkd");
      return props.history.push("/dashboard");
    } else {
      inputEl.current.value = "";
    }
    console.log("abc");
    e.preventDefault();
  };

  return (
    <div>
      {localStorage.getItem("token") === null ? (
        <form>
          <input ref={inputEl} data-test="login__pwd" type="password" />
          <button
            onClick={handerClickLogin}
            data-test="login__submit"
            type="submit"
          >
            login
          </button>
        </form>
      ) : (
        props.history.push("/dashboard")
      )}
    </div>
  );
};

export default Login;
