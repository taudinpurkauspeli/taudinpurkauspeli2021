import React, { useState } from "react"
import DiseaseDataService from "../services/disease.service"
import { useTranslation } from 'react-i18next';

const AddDisease = () => {
  const initialDiseaseState = {
    id: null,
    category: "",
    title: "",
    description: "",
    published: false
  }
  const [disease, setDisease] = useState(initialDiseaseState);
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation()

  const handleInputChange = event => {
    const { name, value } = event.target;
    setDisease({ ...disease, [name]: value });
  }

  const saveDisease = () => {
    var data = {
      category: disease.category,
      title: disease.title,
      description: disease.description
    }

    DiseaseDataService.create(data)
      .then(response => {
        setDisease({
          id: response.data.id,
          category: response.data.category,
          title: response.data.title,
          description: response.data.description,
        })
        setSubmitted(true)
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const newDisease = () => {
    setDisease(initialDiseaseState)
    setSubmitted(false)
  };



  
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>{t('diseaseAdded')}</h4>
          <button className="btn btn-success" onClick={newDisease}>
            {t('addDisease')}
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="category">{t('category')}</label>
            <input
              type="text"
              className="form-control"
              id="category"
              required
              value={disease.category}
              onChange={handleInputChange}
              name="category"
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">{t('title')}</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={disease.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">{t('description')}</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={disease.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveDisease} className="btn btn-success">
            {t('button_submitNewDisease')}
          </button>
        </div>
      )}
    </div>
  )
}

  export default AddDisease
