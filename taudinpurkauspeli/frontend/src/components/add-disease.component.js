
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
      console.log(response.data)
      document.getElementById('CATEGORY_ID').value=''
      document.getElementById('TITLE_ID').value=''
      document.getElementById('DESCRIPTION_ID').value=''
    })
    .catch(e => {
      console.log(e);
    })
  }

  
    return (
      <div>
      <form onSubmit ={addDisease}>
        <div>Category: <input {...props.category} id="CATEGORY_ID"/> 
        </div>
        <div>Title: <input {...props.title} id="TITLE_ID"/>
        </div>
        <div>Description: <input {...props.description} id="DESCRIPTION_ID"/>
        </div>
        <div><button type="submit">add</button></div>
      </form>
      </div>
      
    );
  }

  export default AddDisease