import React from "react";

const signin = () => {
  return (
    <div>
      {" "}
      <div>
        <h1 className="formhead">Sign in to My E-Learning platform</h1>
        <div className="formcontainer">
          <form>
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signin;
