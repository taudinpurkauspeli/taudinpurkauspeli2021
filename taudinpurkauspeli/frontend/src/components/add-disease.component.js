import React, { Image, useState, useEffect } from 'react'
import DiseaseDataService from "../services/disease.service"

const AddDisease = (props) => {

  const addDisease = (event) => {
    event.preventDefault()
    const diseaseObject = {
      category: props.category.value,
      title: props.title.value,
      description: props.description.value
    }

    DiseaseDataService.create(diseaseObject)
    .then(response => {
      this.setState({
        id: response.data.id,
        category: response.data.category,
        title: response.data.title,
        description: response.data.description,

        submitted: true
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  
    return (
      <div>
      <form onSubmit ={addDisease}>
        <div>Category: <input {...props.category}/> 
        </div>
        <div>Title: <input {...props.title}/>
        </div>
        <div>Description: <input {...props.description}/>
        </div>
        <div><button type="submit">add</button></div>
      </form>
      </div>
      
    );
  }

  export default AddDisease