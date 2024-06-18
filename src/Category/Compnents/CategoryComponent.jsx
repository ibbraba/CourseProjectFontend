import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CategoryComponent = () => {
  
    const [Categories, setCategories] = useState([])
    const [errorMessage, SetErrorMessage] = useState(null)

    useEffect(() => {

        GetAllCategories()

    }, [])
  
    async function GetAllCategories(){
        try {
            console.log("Fetching categories ...")
            var response = await axios.get("https://localhost:7201/CategoryContoller/GetCategories")

            setCategories(response.data)
            SetErrorMessage(null)

        } catch (error) {
            console.log(error);
            SetErrorMessage("Un probleme est survenu lors du chargement des categories")
        }
    }




    return (
    <div>

        <h1>Categories</h1>

        {Categories && Categories.map(category => <>
        
            <div key={category.categoryId} className="card mb-4" >
                    
                    <div className="card-body">
                        <h5 className="card-title">{category.title}</h5>
                        <p className="card-text">{category.description}</p>
                        <Link className='btn btn-primary' to={'/category/' + category.categoryId}> Afficher </Link>
                        
                    </div>
            </div>

        </>)}


    </div>
  )
}

export default CategoryComponent