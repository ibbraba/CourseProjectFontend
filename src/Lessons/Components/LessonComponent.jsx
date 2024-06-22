import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const LessonComponent = () => {

    const [lessons, setLessons] = useState(null)
    const [errorMessage, SetErrorMessage] = useState(null)
    const [categories, setCategories] = useState([])

    const [currentCategoryId, setCurrentCategoryId] = useState(null)
    const [currentLessons, setCurrentLessons] = useState(null) 

    useEffect(() => {
        GetAllLessons()
        GetCategories()
    }, [])

    useEffect(() => {

    }, [lessons, categories])

    useEffect(() => {

        if(currentCategoryId){
            var lessonCategory = lessons.filter(x => x.categoryId === currentCategoryId)
            console.log(lessonCategory);
            setCurrentLessons(lessonCategory)
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

    async function GetAllLessons() {

        try {
            var response = await axios.get("https://localhost:7201/Course/GetAll")
            setLessons(response.data)
            setCurrentLessons(response.data)


        } catch (error) {
            SetErrorMessage("Une erreur est survenue lors de la récuperation des leçons. Veuillez réessayer")
        }
    }

    return (
        <div>
            <h1 className='mb-2'>Leçons</h1>
            <div className='category-list  mt-3 mb-5'>
                {categories && categories.map(category =>

                    <div key={category.categoryId}>
                        <button className='btn btn-primary' onClick={() => { setCurrentCategoryId(category.categoryId) }}>{category.title}</button>
                    </div>
                )}
            </div>


            {currentLessons && currentLessons.map(lesson => <>

                <div key={lesson.id} className="card mb-4" >

                    <div className="card-body">
                        <h5 className="card-title">{lesson.title}</h5>
                        <p className="card-text">{lesson.description}</p>
                        <Link className='btn btn-primary' to={'/lecon/' + lesson.id}> Lire  </Link>

                    </div>
                </div>


            </>)}


            {!lessons && errorMessage &&
                <div className="alert alert-danger"> {errorMessage} </div>
            }



        </div>
    )
}

export default LessonComponent