import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const LessonComponent = () => {

    const [lessons, setLessons] = useState(null)
    const [errorMessage, SetErrorMessage] = useState(null)
    const [categories, setCategories] = useState(null)
    const [lessonsVM, setLessonsVM] = useState(null)

    const [currentCategoryId, setCurrentCategoryId] = useState(null)
    const [currentLessons, setCurrentLessons] = useState(null) 
    

    useEffect(() => {
        GetAllLessons()
        GetCategories()
    }, [])

    useEffect(() => {

        let VM = []
           

        if (categories && lessons && !lessonsVM) {
     
            console.log("Assigning categories ...");
            console.log(categories);
            console.log(lessons);
            console.log(lessonsVM);
            lessons.forEach(lesson => {

                categories.forEach(category => {
                    if (category.categoryId == lesson.categoryId) {
                        lesson.category = category.title
                      
                    }
                })

                VM.push(lesson)    
            })
            console.log(VM);
            setLessonsVM(VM)
        }

   
      

    }, [lessons, categories])

    useEffect(() => {


    }, [lessonsVM])

    useEffect(() => {

        if(currentCategoryId){
            var lessonCategory = lessonsVM.filter(x => x.categoryId === currentCategoryId)
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

            <div className='category-list  mt-3 mb-5'>
                {categories && categories.map(category =>

                    <div key={category.categoryId}>
                        <button className='btn btn-primary' onClick={() => { setCurrentCategoryId(category.categoryId) }}>{category.title}</button>
                    </div>
                )}
            </div>


            {currentLessons && currentLessons.map(lecon => <>

                <div key={lecon.id} className="card mb-4" >

                <div className="card-body">
                            <p className='post-category mb-5'> {lecon.category} </p>
                            <h5 className="card-title">{lecon.title}</h5>
                            <p className="card-text">{lecon.description}</p>
                            <Link className='lbutton btn bg-gray' to={'/lecon/' + lecon.id}> Lire la leçon </Link>

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