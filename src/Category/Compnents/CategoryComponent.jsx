import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getImagePath } from '../../Hooks/ImageHook'

const CategoryComponent = () => {
  
    const [Categories, setCategories] = useState(null)
    const [errorMessage, SetErrorMessage] = useState(null)
    const [fullCat, setFullCat] = useState(null)


    const [categoriesImg, setCategoriesImg] = useState([])

    useEffect(() => {

        GetAllCategories()

    }, [])

    useEffect(() => {

        var catWithImg = []
        
        if(Categories){
            Categories.forEach(category => {
                category.imgPath = getImagePath(category.title)
                catWithImg.push(category)
                console.log(catWithImg);
               
            });


            setFullCat(catWithImg)
        }

    }, [Categories])

    
    useEffect(() => {
        console.log("UE");
    },[fullCat])


    async function GetAllCategories(){
        try {
            console.log("Fetching categories ...")
            var response = await axios.get("https://courseprojectwebapp.azurewebsites.net/CategoryContoller/GetCategories")

            setCategories(response.data)
            SetErrorMessage(null)

        } catch (error) {
            console.log(error);
            SetErrorMessage("Un probleme est survenu lors du chargement des categories")
        }
    }




    return (
    <div>


        {fullCat && fullCat.map(category => <>
        
            <div key={category.categoryId} className="card mb-4" >
                    
                    <div className="card-body">
                    <div className="post-inside-card">
                            <div>
                                <h5 className="card-title my-3">{category.title}</h5>
                                <p className="card-text my-3">{category.description}</p>
                            </div>
                            <img src={category.imgPath}></img>
                        </div>
                        <Link className='lbutton btn bg-gray' to={'/category/' + category.categoryId}> Afficher </Link>
                        
                    </div>
            </div>

        </>)}
        {!Categories && errorMessage && <div className='my-5 alert alert-danger'> {errorMessage} </div>}

    </div>
  )
}

export default CategoryComponent