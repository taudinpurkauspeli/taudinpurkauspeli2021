import React, { useState, useEffect } from "react"
import DiseaseDataService from "../services/disease.service"

const Disease = props => {
  const initialDiseaseState = {
    id: null,
    category: "",
    title: "",
    description: "",
  }
  const [currentDisease, setCurrentDisease] = useState(initialDiseaseState);
  const [message, setMessage] = useState("")

  const getDisease = id => {
    DiseaseDataService.get(id)
      .then(response => {
        setCurrentDisease(response.data)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e);
      })
  }

  useEffect(() => {
    getDisease(props.match.params.id)
  }, [props.match.params.id])

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentDisease({ ...currentDisease, [name]: value });
  };

  const updateDisease = () => {
    DiseaseDataService.update(currentDisease.id, currentDisease)
      .then(response => {
        console.log(response.data);
        setMessage("Taudin tiedot päivitettiin!")
      })
      .catch(e => {
        console.log(e)
      })
  }

  const deleteDisease = () => {
    DiseaseDataService.delete(currentDisease.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/diseases")
      })
      .catch(e => {
        console.log(e)
      })
  }

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
                name="category"
                value={currentDisease.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentDisease.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentDisease.description}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteDisease}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateDisease}
          >
            Päivitä
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Klikkaa tautia</p>
        </div>
      )}
    </div>
  )
}

export default Disease