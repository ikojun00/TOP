import React from "react";

const Overview = (props) => {
  const { firstName, lastName, email } = props.data;
  console.log(props)

  return (
    <div>
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>Email: {email}</p>
    </div>
  );
};

export default Overview;