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
      }],
      skills: [{
        id: uniqid(),
        skill: 'JavaScript',
        achieved: 'used at university courses'
      }],
      otherSkills: {
        languages: 'English (native), German (fluent)',
        hobbies: 'football, rugby, MMA...'
      }
    };
  }

  handleChange = (e, section, index) => {
    const { name, value } = e.target;
    if (section === "basicInfo" || section === "otherSkills") {
      this.setState((prevState) => ({
        [section]: { ...prevState[section], [name]: value }
      }));
    } else {
      this.setState((prevState) => {
        const updatedSection = [...prevState[section]];
        updatedSection[index][name] = value;
        return { [section]: updatedSection };
      });
    }
  };

  handleAddInput = (section, defaultData) => {
    const { [section]: currentSection } = this.state;
    const newInput = {
      id: uniqid(),
      ...defaultData
    };
    this.setState({ [section]: [...currentSection, newInput] });
  };

  handleRemoveInput = (section, id) => {
    const { [section]: currentSection } = this.state;
    const filteredSection = currentSection.filter(input => input.id !== id);
    this.setState({ [section]: filteredSection });
  };

  renderInputs = (section, defaultData) => {
    const inputs = this.state[section];

    return inputs.map((input, index) => (
      <div key={input.id} className="cvEditor">
        {Object.keys(defaultData).map((key) => (
          <label key={key}>
          {key[0].toUpperCase() + key.substring(1).replace(/([A-Z])/g, ' $1').toLowerCase() + ':'}
            <input
              type="text"
              name={key}
              value={input[key]}
              onChange={(event) => this.handleChange(event, section, index)}
            />
          </label>
        ))}
        <br />
        <button onClick={() => this.handleRemoveInput(section, input.id)}>Remove</button>
        <br />
      </div>
    ));
  };

  render() {
    return (
      <div className="cv">
        <div className="cvEditor">
          <h2>Personal details</h2>
          {Object.keys(this.state.basicInfo).map((key) => (
            <label key={key}>
              {key[0].toUpperCase() + key.substring(1).replace(/([A-Z])/g, ' $1').toLowerCase() + ':'}
              <input
                type="text"
                name={key}
                value={this.state.basicInfo[key]}
                onChange={(event) => this.handleChange(event, "basicInfo")}
              />
            </label>
          ))}
          <br />
          <h2>Work experience</h2>
          {this.renderInputs("workExperience", {
            company: 'Google',
            position: 'Software Engineer',
            startDate: '2020',
            endDate: '2021'
          })}
          <button onClick={() => this.handleAddInput("workExperience", {
            company: 'Google',
            position: 'Intern',
            startDate: 'May 2022',
            endDate: 'Present'
          })}>Add Input</button>
          <br />
          <h2>Education</h2>
          {this.renderInputs("education", {
            university: 'Harvard',
            startDate: 'October 2020',
            endDate: 'Present'
          })}
          <button onClick={() => this.handleAddInput("education", {
            university: 'Harvard',
            startDate: 'October 2020',
            endDate: 'Present'
          })}>Add Input</button>
          <br />
          <h2>Technical skills</h2>
          {this.renderInputs("skills", {
            skill: 'JavaScript',
            achieved: 'used at university courses'
          })}
          <button onClick={() => this.handleAddInput("skills", {
            skill: 'JavaScript',
            achieved: 'used at university courses'
          })}>Add Input</button>
          <br />
          <h2>Other skills and interests</h2>
            {Object.keys(this.state.otherSkills).map((key) => (
              <label key={key}>
                {key[0].toUpperCase() + key.substring(1).replace(/([A-Z])/g, ' $1').toLowerCase() + ':'}
                <input
                  type="text"
                  name={key}
                  value={this.state.otherSkills[key]}
                  onChange={(event) => this.handleChange(event, "otherSkills")}
                />
              </label>
            ))}
        </div>
        <Overview data={this.state}/>
      </div>
    );
  }
}

export default CVForm;