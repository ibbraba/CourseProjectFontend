import React, { useEffect, useState } from 'react'
import AdminIndexPage from '../Pages/AdminIndexPage'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ManagePostComponent = () => {

  const [articles, setArticles] = useState(null)
  const [lessons, setLessons] = useState(null)
  const [errorMessage, SetErrorMessage] = useState(null)
  const [tab, setTab] = useState(1)

  useEffect(() => {

    GetAllLessons()
    GetAllArticles()
  }, [])

  useEffect(() => {

  }, [articles, lessons, tab])



  //Fetch all articles
  async function GetAllArticles() {


    try {

      var response = await axios.get("https://courseprojectwebapp.azurewebsites.net/Article/GetAll")
      if (response.status == 200) {
        //      console.log(response.data);
        setArticles(response.data)
      }

    } catch (error) {

      SetErrorMessage("Un problème est survenu lors de la recuperatiion des articles. Veuillez ressayer.")
    }

  }

  async function GetAllLessons() {

    try {
      var response = await axios.get("https://courseprojectwebapp.azurewebsites.net/Course/GetAll")
      setLessons(response.data)
    } catch (error) {
      SetErrorMessage("Une erreur est survenue lors de la récuperation des leçons. Veuillez réessayer")
    }
  }

  async function DeleteArticle(id){
    
    if(window.confirm("Voulez vous supprimer cette publication ? ")){
      try {
        var response = await axios.delete("https://courseprojectwebapp.azurewebsites.net/Article/Delete?id=" + id)
        GetAllArticles()
      } catch (error) {
        console.log(error);
      }
    }
    
  }

  async function DeleteLecon(id){
    if(window.confirm("Voulez vous supprimer cette publication ? ")){
      try {
        var response = await axios.delete("https://courseprojectwebapp.azurewebsites.net/Course/Delete?id=" + id)
        GetAllLessons()
      } catch (error) {
        console.log(error);
      }
    }
    
  }

  return (

    <div>
      <ul>
        <Link className='btn btn-secondary' onClick={()=> setTab(1) }> Articles </Link>
        <Link className='btn btn-secondary' onClick={() => setTab(2)}> Leçons </Link>
      </ul>

      {tab == 1 && articles && articles.map(article =>
        <div key={article.id} className="card mb-4" >

          <div className="card-body">
            <h5 className="card-title">{article.title}</h5>
            <p className="card-text">{article.description}</p>
            <Link className='btn btn-primary' to={'/article/' + article.id}> Lire </Link>
            <Link className='btn btn-info' to={'/admin-create/article/' + article.id}> Editer </Link>
            <button onClick={() => {DeleteArticle(article.id)}}  className='btn btn-danger'> Supprimer </button>


          </div>
        </div>

      )}

      {tab == 2 && lessons && lessons.map(lesson => <div key={lesson.id} className="card mb-4" >

        <div className="card-body">
          <h5 className="card-title">{lesson.title}</h5>
          <p className="card-text">{lesson.description}</p>
          <Link className='btn btn-primary' to={'/article/' + lesson.id}> Lire </Link>
            <Link className='btn btn-info' to={'/admin-create/lecon/' + lesson.id}> Editer </Link>
            <button onClick={() => {DeleteLecon(lesson.id)}}  className='btn btn-danger'> Supprimer </button>

        </div>
      </div>)}

      <div>

      </div>
    </div>

  )
}

export default ManagePostComponent