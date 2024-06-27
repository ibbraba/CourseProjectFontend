import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const SingleArticleComponent = () => {
       
    const [article, setArticle] = useState(null)
    const [errorMessage, SetErrorMessage] = useState(null)

    const params = useParams()
    const { id } = params

    useEffect(() => {
        GetArticle()
    }, [])

    useEffect(() => {

    }, [article])
  
    async function GetArticle(){

        try {
            console.log("Call Single article with id " + id);
            const res = await axios.get("https://localhost:7201/Article/Article?id=" + id)
            setArticle(res.data)
            SetErrorMessage(null)            
        } catch (error) {
            SetErrorMessage("Une erreur est survenue lors de la récuperation de l'article")
            setArticle(null)
        }
    }


    return (
        <div className='post-wrapper'>
        {article && 
            <div>
            <div className='post-title mb-5'> {article.title} </div>
            <div className='post-description mb-5' > {article.description} </div>
            <div className='post-content'>{article.content} </div>
            </div>       

        }

        {!article && errorMessage && 

            <div className="alert alert-danger"> {errorMessage} </div>
            
        }

        <Link className='btn lbutton bg-gray mt-5' to="/articles"> Retour à la liste des articles</Link>

        </div>
    )
}

export default SingleArticleComponent