import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFetchCategories } from '../../Hooks/CategoryHook'
import { getImagePath } from '../../Hooks/ImageHook'

const SingleLessonComponent = () => {
  
    const [lesson, setLesson] = useState(null)

    const [errorMessage, SetErrorMessage] = useState(null)
    const [imgPath, setImgPath] = useState(null)
    
    const params = useParams()
    const { id } = params
    const { category } = params
  
    useEffect(() => {
  
      GetLecon()
      setImgPath(getImagePath(category))
  

      
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

    {lesson &&   <div className='post-wrapper'>
      {lesson && 
          <div>
          <div className='post-title mb-5 '> {lesson.title} </div>
          {imgPath && 
          <div className='article-image mb-5'>
          <img src={imgPath}></img>
          </div>
          }
          <div className='post-description mb-5' > {lesson.description} </div>
          <div className='post-content'  dangerouslySetInnerHTML={{ __html:lesson.content}} ></div>
          </div>       

      }
      
     {!lesson && errorMessage && <div className='alert alert-danger'> {errorMessage}  </div>}   
      
      
      <Link className='btn lbutton bg-gray mt-5' to="/lecons" > Retour à la liste des leçons</Link>
      
      
      
      </div>}





  </div>
  )
}

export default SingleLessonComponent