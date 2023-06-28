import React, { Component } from 'react';
import Overview from './Overview';

class CVForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const updatedFormData = { ...prevState.formData, [name]: value };
      return { formData: updatedFormData };
    });
  };

  render() {
    const { firstName, lastName, email } = this.state.formData;

    return (
      <div>
        <form>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>
          <br />
        </form>
        <Overview data={this.state.formData}/>
      </div>
    );
  }
}

export default CVForm;