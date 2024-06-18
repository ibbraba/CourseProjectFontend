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
            SetErrorMessage(error)
            setArticle(null)
        }
    }


    return (
        <>
        {article && 
            <div>
            <div> {article.id} </div>
            <div> {article.presentation} </div>
            <div>{article.content} </div>
            </div>       

        }

        {!article && errorMessage && 

            <div className="alert "> {errorMessage} </div>
            
        }

        <Link to="/articles"> Retour à la liste des articles</Link>

        </>
    )
}

export default SingleArticleComponent