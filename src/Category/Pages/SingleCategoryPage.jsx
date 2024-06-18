import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const SingleCategoryPage = () => {

    const [articles, setArticles] = useState([])
    const [lessons, setLessons] = useState([])
    const [errorMessage, SetErrorMessage] = useState(null)
    const [categories, setCategories] = useState([])
    const [selectedCategory, SetSelectedCategory] = useState(null)

    const params = useParams()
    const { id } = params

    useEffect(() => {

        GetCategories()



    }, [])


    useEffect(() => {

        console.log(selectedCategory);
        GetArticlesFromCategory()
        GetLessonsFromCategory()

    }, [selectedCategory])

    useEffect(() => {

        console.log(lessons);
        console.log(articles);

    }, [lessons, articles])
    //Fetch all categories
    async function GetCategories() {
        try {
            console.log("Fetching categories ...")
            var response = await axios.get("https://localhost:7201/CategoryContoller/GetCategories")

            setCategories(response.data)
            console.log(response.data);
            // Select the choosen category in the response
            var selected = response.data.filter(category => { return category.categoryId === id })

            SetSelectedCategory(selected[0])


        } catch (error) {
            console.log(error);
            SetErrorMessage("Un erreur est survenue, veuillez réessayer.")
        }
    }


    async function GetArticlesFromCategory() {
        try {
            var response = await axios.get("https://localhost:7201/Article/GetByCategory?categoryId=" + id)
            setArticles(response.data)

        } catch (error) {
            console.log(error);
        }
    }

    async function GetLessonsFromCategory() {
        try {

            var response = await axios.get("https://localhost:7201/Course/GetByCategory?categoryId=" + id)
            setLessons(response.data)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>

            {selectedCategory && <div>

                <h1>{selectedCategory.title}</h1>
                <p>{selectedCategory.description}</p>


            </div>}

            {errorMessage && !selectedCategory && <div>

                <div className='alert alert-danger'>{errorMessage}</div>

            </div>}

            {articles && articles.map(article =>

                <>
                    <div key={article.id} className="card mb-4" >

                        <div className="card-body">
                            <h5 className="card-title">{article.title}</h5>
                            <p className="card-text">{article.description}</p>
                            <Link className='btn btn-primary' to={'/article/' + article.id}> Lire l'article </Link>

                        </div>
                    </div>

                </>
            )}



            {lessons && lessons.map(lesson => <>

                <div key={lesson.id} className="card mb-4" >

                    <div className="card-body">
                        <h5 className="card-title">{lesson.title}</h5>
                        <p className="card-text">{lesson.description}</p>
                        <Link className='btn btn-primary' to={'/lecon/' + lesson.id}> Lire  </Link>

                    </div>
                </div>


            </>)}


            <Link to={'/categories'}> Retour à la liste des categories </Link>

        </div>
    )
}

export default SingleCategoryPage