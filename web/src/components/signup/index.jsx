import { useState, useContext } from "react";
import axios from 'axios';
import { GlobalContext } from '../../context/Context';


function SignUp() {


  let { state} = useContext(GlobalContext);

  const [result, setResult] = useState("");

  const [name, setName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const signupHandler = async (e) => {
      e.preventDefault();

      try {
          await axios.post(`${state.baseUrl}/signup`, {
              firstName: name,
              lastName: lastName,
              email: email,
              password: password
          })


          console.log("signup successful");
          setResult("signup successful")

      } catch (e) {
          console.log("e: ", e);
      }


       e.reset();
  }

    return (
      <form onSubmit={signupHandler}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => { setName(e.target.value) }} 
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name"
          onChange={(e) => { setlastName(e.target.value) }} 
           />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => { setEmail(e.target.value) }}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => { setPassword(e.target.value) }} 
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p >
        {result}
        </p>
      </form>
    )
  
}

export default SignUp
