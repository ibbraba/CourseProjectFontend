import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getImagePath } from '../../Hooks/ImageHook'


const ArticleComponent = () => {

    const [articles, setArticles] = useState(null)
    const [errorMessage, SetErrorMessage] = useState(null)
    const [categories, setCategories] = useState([])

    const [articlesVM, setArticlesVM] = useState(null)

    const [currentArticles, setCurrentArticles] = useState(null)
    const [currentCategoryId, setCurrentCategoryId] = useState(null)

    //Find category id in request parameter
    const params = useParams()



    useEffect(() => {

        GetCategories()
        console.log("Fetching all articles");
        GetAllArticles()
    }, []);

    //Re render when articles fetched
    useEffect(() => {




    }, [errorMessage])

    useEffect(() => {
        let VM = []

        if (categories && articles && !articlesVM) {

            articles.forEach(article => {

                categories.forEach(category => {
                    if (category.categoryId == article.categoryId) {
                        article.category = category.title
                        article.imgPath = getImagePath(category.title)

                    }
                })
                VM.push(article)
            })
            setArticlesVM(VM)
        }

    }, [categories, articles])

    useEffect(() => {
        console.log("Category change ...");
        console.log("Fetching articles from category" + currentCategoryId);
        if (currentCategoryId) {

            var articleCategory = articlesVM.filter(x => x.categoryId === currentCategoryId)
            console.log(articleCategory);
            setCurrentArticles(articleCategory)
        }
    }, [currentCategoryId])






    //Fetch all categories
    async function GetCategories() {
        try {
            console.log("Fetching categories ...")
            var response = await axios.get("https://courseprojectwebapp.azurewebsites.net/CategoryContoller/GetCategories")

            setCategories(response.data)

        } catch (error) {
            console.log(error);
        }
    }

    //Find articles by category
    async function GetByCategory() {
        try {

            var response = await axios.get("https://courseprojectwebapp.azurewebsites.net/Article/GetByCategory?categoryId=" + currentCategoryId)
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

            var response = await axios.get("https://courseprojectwebapp.azurewebsites.net/Article/GetAll")
            if (response.status == 200) {
                //      console.log(response.data);
                setArticles(response.data)
                setCurrentArticles(response.data)
            }

        } catch (error) {

            SetErrorMessage("Un problème est survenu lors de la recuperatiion des articles. Veuillez ressayer.")
        }

    }



    return (
        <div>


            <div className='category-list  mt-3 mb-5'>
                {categories && categories.map(category =>

                    <div key={category.categoryId}>
                        <button className='btn mbutton category-button mb-3' onClick={() => { setCurrentCategoryId(category.categoryId) }}>{category.title}</button>
                    </div>
                )}
            </div>


            {currentArticles && currentArticles.map(article =>

                <>
                    <div key={article.id} className="card mb-4" >

                        <div className="card-body">
                            <p className='post-category mb-5'> {article.category} </p>
                            <div className="post-inside-card">
                                <div className='post-display'>
                                    <h5 className="card-title my-3">{article.title}</h5>
                                    <p className="card-text my-3">{article.description}</p>
                                </div>
                                <img src={article.imgPath}></img>
                            </div>
                            <Link className='lbutton btn bg-gray' to={'/article/' + article.category + "/" + article.id}> Lire l'article </Link>

                        </div>
                    </div>

                </>
            )}

            {!articles && errorMessage &&
                <div className="alert alert-danger"> {errorMessage} </div>
            }



        </div>

    )




}

export default ArticleComponent