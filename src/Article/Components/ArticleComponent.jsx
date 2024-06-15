import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


const ArticleComponent = () => {

    const [articles, setArticles] = useState([])
    const { errorMessage, SetErrorMessage } = useState(null)


    useEffect(() => {

        GetAllArticles()

    }, []);


    useEffect(() => {

    }, [articles])


    const params = useParams()
    const { id } = params


    async function GetByCategory(){
        try {
            console.log("Fetching categories ...")
        var response = await axios.get("https://localhost:7201/Article/GetByCategory?categoryId=" + id)
        setArticles(response.data)    
        SetErrorMessage(null)
        } catch (error) {
            SetErrorMessage("Unable to fetch articles")
            setArticles(null)
        }
    }

    async function GetAllArticles() {


        try {
            console.log("Fetching articles...");
            var response = await axios.get("https://localhost:7201/Article/GetAll")
            if (response.status == 200) {
                console.log(response.data);
                setArticles(response.data)
            }

        } catch (error) {

            SetErrorMessage("Unable to fetch articles")
        }

    }



    return (
        <>
            {articles && articles.map(article =>

                <div key={article.id}>
                    <h1> {article.title} </h1>
                    <Link to={'/article/' + article.id}> Lire l'article </Link>
                </div>
            )}
            {errorMessage &&

                <div className="alert alert-danger"> {errorMessage} </div>

            }


        </>

    )




}

export default ArticleComponent