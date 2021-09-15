import React, { Component } from "react";
import DiseaseDataService from "../services/disease.service";

export default class Disease extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getDisease = this.getDisease.bind(this);
    this.updateDisease = this.updateDisease.bind(this);
    this.deleteDisease = this.deleteDisease.bind(this);

    this.state = {
      currentDisease: {
        id: null,
        category: "",
        title: "",
        description: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getDisease(this.props.match.params.id);
  }

  onChangeCategory(e) {
    const category = e.target.value;

    this.setState(function(prevState) {
      return {
        currentDisease: {
          ...prevState.currentDisease,
          category: category
        }
      };
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentDisease: {
          ...prevState.currentDisease,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentDisease: {
        ...prevState.currentDisease,
        description: description
      }
    }));
  }

  getDisease(id) {
    DiseaseDataService.get(id)
      .then(response => {
        this.setState({
          currentDisease: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateDisease() {
    DiseaseDataService.update(
      this.state.currentDisease.id,
      this.state.currentDisease
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The disease was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteDisease() {    
    DiseaseDataService.delete(this.state.currentDisease.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/diseases')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentDisease } = this.state;

    return (
      <div>
        {currentDisease ? (
          <div className="edit-form">
            <h4>Disease</h4>
            <form>
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  value={currentDisease.category}
                  onChange={this.onChangeCategory}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentDisease.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentDisease.description}
                  onChange={this.onChangeDescription}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteDisease}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateDisease}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Disease...</p>
          </div>
        )}
      </div>
    );
  }
}
