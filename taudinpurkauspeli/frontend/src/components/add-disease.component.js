/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import DiseaseDataService from '../services/disease.service';

export default class AddDisease extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveDisease = this.saveDisease.bind(this);
    this.newDisease = this.newDisease.bind(this);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      id: null,
      category: '',
      title: '',
      description: '',

      submitted: false,
    };
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value,
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  saveDisease() {
    const data = {
      // eslint-disable-next-line react/destructuring-assignment
      category: this.state.category,
      title: this.state.title,
      description: this.state.description,
    };

    DiseaseDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          category: response.data.category,
          title: response.data.title,
          description: response.data.description,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newDisease() {
    this.setState({
      id: null,
      category: '',
      title: '',
      description: '',

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Tauti lisätty!</h4>
            <button className="btn btn-success" onClick={this.newDisease}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                required
                value={this.state.category}
                onChange={this.onChangeCategory}
                name="category"
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveDisease} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
