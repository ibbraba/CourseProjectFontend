import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getImagePath } from '../../Hooks/ImageHook'

const SingleCategoryPage = () => {

    const [articles, setArticles] = useState([])
    const [lessons, setLessons] = useState([])
    const [errorMessage, SetErrorMessage] = useState(null)
    const [categories, setCategories] = useState([])
    const [selectedCategory, SetSelectedCategory] = useState(null)
    const [imgPath, setImgPath] = useState(null)
    const params = useParams()
    const { id } = params

    useEffect(() => {

        GetCategories()
      
    }, [])


    useEffect(() => {


        console.log(selectedCategory);
        if(selectedCategory){
            setImgPath(getImagePath(selectedCategory.title))
        }
        console.log(imgPath);
        GetArticlesFromCategory()
        GetLessonsFromCategory()

    }, [selectedCategory])

    useEffect(() => {

     

    }, [lessons, articles])
    //Fetch all categories
    async function GetCategories() {
        try {
            console.log("Fetching categories ...")
            var response = await axios.get("https://localhost:7201/CategoryContoller/GetCategories")

            setCategories(response.data)
     
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
                        <div className="post-inside-card">
                                <div>
                                    <h5 className="card-title my-3">{article.title}</h5>
                                    <p className="card-text my-3">{article.description}</p>
                                </div>
                                <img src={imgPath}></img>
                            </div>
                            <Link className='lbutton btn bg-gray' to={'/article/' + article.id}> Lire  </Link>

                        </div>
                    </div>

                </>
            )}



            {lessons && lessons.map(lesson => <>

                <div key={lesson.id} className="card mb-4" >

                    <div className="card-body">
                        <h5 className="card-title">{lesson.title}</h5>
                        <p className="card-text">{lesson.description}</p>
                        <Link className='lbutton btn bg-gray' to={'/lecon/' + lesson.id}> Lire  </Link>

                    </div>
                </div>


            </>)}


            <Link to={'/categories'}> Retour à la liste des categories </Link>

        </div>
    )
}

export default SingleCategoryPage