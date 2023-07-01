import React, { Component } from 'react';
import "../styles/index.css";
import uniqid from "uniqid";
import Overview from './Overview';

class CVForm extends Component {
  constructor() {
    super();
    this.state = {
      basicInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        phone: '+123 45 565 2322',
        residence: 'Beograd, Serbia'
      },
      workExperience: [{
        id: uniqid(),
        company: 'Google',
        position: 'Intern',
        startDate: 'May 2022',
        endDate: 'Present'
      }],
      education: [{
        id: uniqid(),
        university: 'Harvard',
        startDate: 'October 2020',
        endDate: 'Present'
      }]
    };
  }

  handleChangeOnBasicInfo = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const updatedBasicInfo = { ...prevState.basicInfo, [name]: value };
      return { basicInfo: updatedBasicInfo };
    });
  };

  handleChangeOnWorkExperience = (event, index) => {
    const { name, value } = event.target;
    this.setState((prevState) => {
      const updatedWorkExperience = [...prevState.workExperience];
      updatedWorkExperience[index][name] = value;
      return { workExperience: updatedWorkExperience };
    });
  };

  handleAddInputOnWorkExperience = () => {
    const { workExperience } = this.state;
    const newWorkExperience = {
      id: uniqid(),
      company: 'Google',
      position: 'Software Engineer',
      startDate: '2020',
      endDate: '2021'
    };
    this.setState({ workExperience: [...workExperience, newWorkExperience] });
  };

  handleRemoveInputOnWorkExperience = (id) => {
    const { workExperience } = this.state;
    const filteredworkExperience = workExperience.filter(input => input.id !== id);
    this.setState({ workExperience: filteredworkExperience });
  };

  handleChangeOnEducation = (event, index) => {
    const { name, value } = event.target;
    this.setState((prevState) => {
      const updatedEducation= [...prevState.education];
      updatedEducation[index][name] = value;
      return { education: updatedEducation};
    });
  };

  handleAddInputOnEducation= () => {
    const { education } = this.state;
    const newEducation= {
      id: uniqid(),
      university: 'Harvard',
      startDate: 'October 2020',
      endDate: 'Present'
    };
    this.setState({ education: [...education, newEducation] });
  };

  handleRemoveInputOnEducation= (id) => {
    const { education } = this.state;
    const filteredEducation = education.filter(input => input.id !== id);
    this.setState({ education: filteredEducation});
  };

  render() {
    const { firstName, lastName, email, phone, residence } = this.state.basicInfo;
    const { workExperience, education } = this.state;

    return (
      <div className="cv">
        <div className="cvEditor">
          <h2>Personal details</h2>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={this.handleChangeOnBasicInfo}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={this.handleChangeOnBasicInfo}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChangeOnBasicInfo}
            />
          </label>
          <br />
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={this.handleChangeOnBasicInfo}
            />
          </label>
          <br />
          <label>
            Residence:
            <input
              type="text"
              name="residence"
              value={residence}
              onChange={this.handleChangeOnBasicInfo}
            />
          </label>
          <br />
          <h2>Work experience</h2>
          {workExperience.map((input, index) => (
          <div key={input.id} className="cvEditor">
            <label>
              Company:
              <input
              type="text"
              name="company"
              value={input.company}
              onChange={(event) => this.handleChangeOnWorkExperience(event, index)}
              />
            </label>
            <br />
            <label>
              Position:
              <input
              type="text"
              name="position"
              value={input.position}
              onChange={(event) => this.handleChangeOnWorkExperience(event, index)}
              />
            </label>
            <br />
            <label>
              Start date:
              <input
              type="text"
              name="startDate"
              value={input.startDate}
              onChange={(event) => this.handleChangeOnWorkExperience(event, index)}
              />
            </label>
            <br />
            <label>
              End date:
              <input
              type="text"
              name="endDate"
              value={input.endDate}
              onChange={(event) => this.handleChangeOnWorkExperience(event, index)}
              />
            </label>
            <br />
            <button onClick={() => this.handleRemoveInputOnWorkExperience(input.id)}>Remove</button>
            <br />
          </div>
          ))}
          <button onClick={this.handleAddInputOnWorkExperience}>Add Input</button>
          <br />
          <h2>Education</h2>
          {education.map((input, index) => (
            <div key={input.id} className="cvEditor">
              <label>
                University:
                <input
                type="text"
                name="university"
                value={input.university}
                onChange={(event) => this.handleChangeOnEducation(event, index)}
                />
              </label>
              <br />
              <label>
                Start date:
                <input
                type="text"
                name="startDate"
                value={input.startDate}
                onChange={(event) => this.handleChangeOnEducation(event, index)}
                />
              </label>
              <br />
              <label>
                End date:
                <input
                type="text"
                name="endDate"
                value={input.endDate}
                onChange={(event) => this.handleChangeOnEducation(event, index)}
                />
              </label>
              <br />
              <button onClick={() => this.handleRemoveInputOnEducation(input.id)}>Remove</button>
              <br />
            </div>
            ))}
            <button onClick={this.handleAddInputOnEducation}>Add Input</button>
          </div>
        <Overview data={this.state}/>
      </div>
    );
  }
}

export default CVForm;