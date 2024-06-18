import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const SingleLeconPage = () => {
  
  const [lesson, setLesson] = useState(null)
  const [errorMessage, SetErrorMessage] = useState(null)
  
  const params = useParams()
  const { id } = params

  useEffect(() => {

    GetLecon()

  }, [])

  useEffect(() => {

  }, [lesson])

  async function GetLecon(){

    try {
      
      var response = await axios.get("https://localhost:7201/Course/Get?id=" + id)
      setLesson(response.data)

    } catch (error) {
      SetErrorMessage("Une erreur est survenue lors de la récuperaation de l'article")
    }

  }

  return (
    <div>

      {lesson && <div>
        
        <h1>{lesson.title}</h1>

        <p>{lesson.description} </p>

        <p>{lesson.content}</p>
        
        </div>}


       {!lesson && errorMessage && <div className='alert alert-danger'> {errorMessage}  </div>}   


        <Link to="/lecons" > Retour à la liste des leçons</Link>

    </div>
  )
}

export default SingleLeconPage