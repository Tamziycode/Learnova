import React from "react";
//This should send a message to my gmail //There should be other contact fields that i havent checked yet Probably their name and whatnot

const Contact = () => {
  return (
    <div>
      <form className="contactform">
        <textarea
          style={{ height: "30px", width: "200px" }}
          name="contactMessage"
          type="text"
          placeholder="Send a message to the creator"
        />
        <input name="contactName" type="text" placeholder="Name" />
        <input
          name="contactEmail"
          type="Email"
          placeholder="Preferred gmail for response"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Contact;
