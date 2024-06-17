import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


const ArticleComponent = () => {

    const [articles, setArticles] = useState([])
    const [errorMessage, SetErrorMessage] = useState(null)
    const [categories, setCategories] = useState([])

    //Find category id in request parameter
    const params = useParams()


    const [currentCategoryId, setCurrentCategoryId] = useState(null)

    useEffect(() => {

        GetCategories()
        console.log("Fetching all articles");
        GetAllArticles()
    }, []);

    //Re render when articles fetched
    useEffect(() => {

    }, [articles])

    useEffect(() => {


    }, [categories, errorMessage])

    useEffect(() => {
        console.log("Category change ...");
        console.log("Fetching articles from category" + currentCategoryId);
        if(currentCategoryId){

            GetByCategory()
        }
    }, [currentCategoryId])
    //Fetch all categories
    async function GetCategories() {
        try {
            console.log("Fetching categories ...")
            var response = await axios.get("https://localhost:7201/CategoryContoller/GetCategories")

            setCategories(response.data)

        } catch (error) {
            console.log(error);
        }
    }

    //Find articles by category
    async function GetByCategory() {
        try {

            var response = await axios.get("https://localhost:7201/Article/GetByCategory?categoryId=" + currentCategoryId)
            console.log(response.data);
            setArticles(response.data)
            SetErrorMessage(null)
        } catch (error) {
            SetErrorMessage("Un problème est survenu lors de la recuperatiion des articles. Veuillez ressayer.")
            setArticles(null)
        }
    }

    //Fetch all articles
    async function GetAllArticles() {


        try {

            var response = await axios.get("https://localhost:7201/Article/GetAll")
            if (response.status == 200) {
                //      console.log(response.data);
                setArticles(response.data)
            }

        } catch (error) {

            SetErrorMessage("Un problème est survenu lors de la recuperatiion des articles. Veuillez ressayer.")
        }

    }



    return (
        <div>

            <h2>Categories</h2>
            {categories && categories.map(category =>

                <div key={category.categoryId}>
                    <button className='btn btn-primary' onClick={() => { setCurrentCategoryId(category.categoryId), console.log("Clickcategory"); }}>{category.title}</button>
                </div>
            )}


            <h2>Articles</h2>
            {articles && articles.map(article =>

                <div key={article.id}>
                    <h1> {article.title} </h1>
                    <Link to={'/article/' + article.id}> Lire l'article </Link>
                </div>
            )}

            {errorMessage &&
                <div className="alert alert-danger"> {errorMessage} </div>
            }



        </div>

    )




}

export default ArticleComponent