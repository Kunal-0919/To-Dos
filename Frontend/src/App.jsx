import React, { useState } from "react";
import "./styles.css";
import LogIn from "./login";
import SignUp from "./signup";
import { Link } from "react-router-dom";

function App() {
  const [active, setActive] = useState(<LogIn />);
  // const history = useHistory()
  return (
    <>
      <div className="page">
        <div className="form-div">{active}</div>
      </div>
    </>
  );
}
export default App;
