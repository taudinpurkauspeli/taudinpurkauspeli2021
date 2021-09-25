import React, { useState, useEffect } from "react"
import DiseaseDataService from "../services/disease.service"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';

const DiseasesList = () => {
  const [diseases, setDiseases] = useState([])
  const [currentDisease, setCurrentDisease] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [searchTitle, setSearchTitle] = useState("")
  const { t } = useTranslation()

  useEffect(() => {
    retrieveDiseases()
  }, [])

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveDiseases = () => {
    DiseaseDataService.getAll()
      .then(response => {
        setDiseases(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveDiseases();
    setCurrentDisease(null);
    setCurrentIndex(-1);
  };

  const setActiveDisease = (disease, index) => {
    setCurrentDisease(disease);
    setCurrentIndex(index);
  };

  const removeAllDiseases = () => {
    DiseaseDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    DiseaseDataService.findByTitle(searchTitle)
      .then(response => {
        setDiseases(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={t('searchByTitle')}
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              {t('button_search')}
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>{t('listOfDiseases')}</h4>

        <ul className="list-group">
          {diseases &&
            diseases.map((disease, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
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
          {t('button_removeAll')}
        </button>
      </div>
      <div className="col-md-6">
        {currentDisease ? (
          <div>
            <h4>{t('disease')}</h4>
            <div>
              <label>
                <strong>{t('category')}:</strong>
              </label>{" "}
              {currentDisease.category}
            </div>
            <div>
              <label>
                <strong>{t('title')}:</strong>
              </label>{" "}
              {currentDisease.title}
            </div>
            <div>
              <label>
                <strong>{t('description')}:</strong>
              </label>{" "}
              {currentDisease.description}
            </div>

            <Link
              to={"/diseases/" + currentDisease.id}
              className="badge badge-warning"
            >
              {t('edit')}
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>{t('clickTheDisease')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseasesList;