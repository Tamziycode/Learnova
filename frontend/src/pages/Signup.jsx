import React from "react";

const signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="formcontainer">
        <h2>Sign Up</h2>
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          autoComplete="new-password"
        />{" "}
        <input
          type="password"
          name="Cpassword"
          placeholder="Confirm Password"
          required
          autoComplete="C-password"
        />
        <input type="gender" name="gender" placeholder="gender" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default signup;
