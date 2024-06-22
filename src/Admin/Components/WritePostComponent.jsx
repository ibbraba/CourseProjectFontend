import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const WritePostComponent = () => {
  
    const [dbpost, setDbpost] = useState(null)   
    const [errorMessage, SetErrorMessage] = useState(null) 
    


    const params = useParams()
    const { id } = params
    const { post } = params

    useEffect(() => {
        
        //Fetch the article to update if passed as parameter
        if(id){

            GetPosiById()
        }
    }, [])    

    useEffect(() => {

    }, [dbpost])

    async function GetPosiById(){
        try {
            
            if(post === "lecon" ){
                //Fetch a course
                let response = await axios.get("https://localhost:7201/Course/Get?id=" + id)
                setDbpost(response.data)
            }else{
                //Fetch an article
                let response = await axios.get("https://localhost:7201/Article/Article?id=" + id)
                setDbpost(response.data) 
            }


        } catch (error) {
            SetErrorMessage("Une erreur est survenue lors de la récuperation du post")
            setDbpost(null)
        }


    }

    return (
    <div>WritePostComponent
        {dbpost &&
             <div>
             <h3> {dbpost.title}</h3>
             <p>{dbpost.description}</p>
 
 
         </div>
        }
       

        {!dbpost && errorMessage && <div className='alert alert-danger'>{ errorMessage }</div>}

    </div>
  )
}

export default WritePostComponent