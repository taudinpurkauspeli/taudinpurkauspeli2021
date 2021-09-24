import DiseaseDataService from "../services/disease.service";
import { Link } from "react-router-dom";

const DiseasesList = (props) => {

  const retrieveDiseases = () => {
    DiseaseDataService.getAll()
      .then(response => {
        props.setDiseases(response.data)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  }

  const refreshList = () => {
    retrieveDiseases()
    props.currentDisease.onCommand(null)
    props.currentIndex.onCommand(-1)
    };

  const setActiveDisease = (disease, index) => {
    props.currentDisease.onCommand(disease)
    props.currentIndex.onCommand(index)
  }

  const removeAllDiseases = () => {
    DiseaseDataService.deleteAll()
      .then(response => {
        refreshList()
      })
      .catch(e => {
        console.log(e)
      });
  }

  const searchTitle = () => {
    DiseaseDataService.findByTitle(props.diseaseFilter)
      .then(response => {
        props.setDiseases(response.data)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  }

  
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              {...props.diseaseFilter}
              className="form-control"
              placeholder="Search by name"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Diseases List</h4>

          <ul className="list-group">
            {props.diseases &&
              props.diseases.map((disease, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === props.currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveDisease(disease, index)}
                  key={index}
                >
                  {disease.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllDiseases}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {props.currentDisease ? (
            <div>
              <h4>Tauti</h4>
              <div>
                <label>
                  <strong>Category:</strong>
                </label>{" "}
                {props.currentDisease.category}
              </div>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {props.currentDisease.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {props.currentDisease.description}
              </div>


              <Link 
                to={"/diseases/" + props.currentDisease.id}
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

  export default DiseasesList