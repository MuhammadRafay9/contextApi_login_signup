import { useState, useContext } from "react";
import { GlobalContext } from '../../context/Context';


import axios from "axios";

function Login() {
  
    let { state, dispatch } = useContext(GlobalContext);

    const [result, setResult] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/login`, {
                email: email,
                password: password
            }, {
                withCredentials: true
            })

            dispatch({
                type: 'USER_LOGIN',
                payload: response.data.profile
            })


            console.log("login successful");
            setResult("login successful")

        } catch (e) {
            console.log("e: ", e);
        }

        // e.reset();
    }

    return (
      <form onSubmit={loginHandler}>
        <h3>Sign In</h3>
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
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p >
        {result}
        </p>
      </form>
    )
  
}

export default Login
