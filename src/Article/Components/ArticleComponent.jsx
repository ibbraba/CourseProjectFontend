import axios from 'axios'
import React, { useEffect, useState } from 'react'


const ArticleComponent = () => {

    const [articles, setArticles] = useState([])
    const {errorMessage, SetErrorMessage} = useState(null)

    useEffect (() => {

        GetAllArticles()

    },[]);


    useEffect(() => {

    },[articles])
/*
    useEffect(() => {

        console.log("Use effect on articles ...");

    }, [articles])
    */
    async function GetAllArticles( ){ 

        if(articles){
            try {
                console.log("Fetching articles...");
                var response = await axios.get("https://localhost:7201/Article/GetAll")
                if(response.status == 200){
                
                    setArticles(response.data)
                }
        
            } catch (error) {
             
                SetErrorMessage("Unable to fetch articles")
            }
        }
    }



    return (
        <>
            {articles && articles.map(article => 
            
            <div key={article.id}>

                <h1> {article.title} </h1>
            </div>
            )}
        
        
        </>

  )




}

export default ArticleComponent