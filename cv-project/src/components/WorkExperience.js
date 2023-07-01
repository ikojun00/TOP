import React, { Component } from 'react';
import uniqid from "uniqid";
import OverviewWorkExperience from './OverviewWorkExperience';

class WorkExperience extends Component {
  constructor() {
    super();
    this.state = {
      inputs: [{
        id: uniqid(),
        company: 'Google',
        position: 'Software Engineer',
        startDate: '2020',
        endDate: '2021'
      }]
    };
  }

  handleChange = (event, index) => {
    const { name, value } = event.target;
    this.setState((prevState) => {
      const updatedInputs = [...prevState.inputs];
      updatedInputs[index][name] = value;
      return { inputs: updatedInputs };
    });
  };

  handleAddInput = () => {
    const { inputs } = this.state;
    const newInput = {
      id: uniqid(),
      company: 'Google',
      position: 'Software Engineer',
      startDate: '2020',
      endDate: '2021'
    };
    this.setState({ inputs: [...inputs, newInput] });
  };

  handleRemoveInput = (id) => {
    const { inputs } = this.state;
    const filteredInputs = inputs.filter(input => input.id !== id);
    this.setState({ inputs: filteredInputs });
  };

  render() {
    const { inputs } = this.state;

    return (
        <div className="cv">
            <div className="cvEditor">
                <h2>Work experience</h2>
                {inputs.map((input, index) => (
                <div key={input.id}>
                    <input
                    type="text"
                    name="company"
                    value={input.company}
                    onChange={(event) => this.handleChange(event, index)}
                    />
                    <input
                    type="text"
                    name="position"
                    value={input.position}
                    onChange={(event) => this.handleChange(event, index)}
                    />
                    <input
                    type="text"
                    name="startDate"
                    value={input.startDate}
                    onChange={(event) => this.handleChange(event, index)}
                    />
                    <input
                    type="text"
                    name="endDate"
                    value={input.endDate}
                    onChange={(event) => this.handleChange(event, index)}
                    />
                    <button onClick={() => this.handleRemoveInput(input.id)}>Remove</button>
                </div>
                ))}
            <button onClick={this.handleAddInput}>Add Input</button>
            </div>
            <OverviewWorkExperience data={{ inputs }}/>
        </div>
    );
  }
}

export default WorkExperience;

/*import React, { Component } from 'react';

class WorkExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experiences: [],
      company: '',
      position: '',
      startDate: '',
      endDate: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  addExperience = () => {
    const { company, position, startDate, endDate } = this.state;
    const newExperience = {
      company,
      position,
      startDate,
      endDate,
    };

    this.setState((prevState) => ({
      experiences: [...prevState.experiences, newExperience],
      company: '',
      position: '',
      startDate: '',
      endDate: '',
    }));
  };

  render() {
    const { experiences, company, position, startDate, endDate } = this.state;

    return (
      <div>
        <div>
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={company}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Position:
            <input
              type="text"
              name="position"
              value={position}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Start Date:
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            End Date:
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <button onClick={this.addExperience}>Add Experience</button>
        </div>
        <div>
          {experiences.length === 0 ? (
            <p>No experiences added yet.</p>
          ) : (
            <ul>
              {experiences.map((experience, index) => (
                <li key={index}>
                  <strong>Company: </strong>
                  {experience.company}
                  <br />
                  <strong>Position: </strong>
                  {experience.position}
                  <br />
                  <strong>Start Date: </strong>
                  {experience.startDate}
                  <br />
                  <strong>End Date: </strong>
                  {experience.endDate}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default WorkExperience;*/