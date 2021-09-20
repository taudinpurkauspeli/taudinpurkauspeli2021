import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DiseaseDataService from '../services/disease.service';

export default class DiseasesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveDiseases = this.retrieveDiseases.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDisease = this.setActiveDisease.bind(this);
    this.removeAllDiseases = this.removeAllDiseases.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      diseases: [],
      currentDisease: null,
      currentIndex: -1,
      searchTitle: '',
    };
  }

  componentDidMount() {
    this.retrieveDiseases();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle,
    });
  }

  setActiveDisease(disease, index) {
    this.setState({
      currentDisease: disease,
      currentIndex: index,
    });
  }

  refreshList() {
    this.retrieveDiseases();
    this.setState({
      currentDisease: null,
      currentIndex: -1,
    });
  }

  retrieveDiseases() {
    DiseaseDataService.getAll()
      .then((response) => {
        this.setState({
          diseases: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeAllDiseases() {
    DiseaseDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchTitle() {
    // eslint-disable-next-line react/destructuring-assignment
    DiseaseDataService.findByTitle(this.state.searchTitle)
      .then((response) => {
        this.setState({
          diseases: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const {
      searchTitle, diseases, currentDisease, currentIndex,
    } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Diseases List</h4>

          <ul className="list-group">
            {diseases
            && diseases.map((disease, index) => (
              <li
                className={
                  // eslint-disable-next-line prefer-template
                  'list-group-item '
                  + (index === currentIndex ? 'active' : '')
                }
                onClick={() => this.setActiveDisease(disease, index)}
                aria-hidden="true"
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              >
                {disease.title}
              </li>
            ))}
          </ul>

          {/* eslint-disable-next-line react/button-has-type */}
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllDiseases}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentDisease ? (
            <div>
              <h4>Tauti</h4>
              <div>
                <p>
                  <strong>Category:</strong>
                </p>
                {' '}
                {currentDisease.category}
              </div>
              <div>
                <p>
                  <strong>Title:</strong>
                </p>
                {' '}
                {currentDisease.title}
              </div>
              <div>
                <p>
                  <strong>Description:</strong>
                </p>
                {' '}
                {currentDisease.description}
              </div>

              <Link
                to={`/diseases/ ${currentDisease.id}`}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Disease...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
