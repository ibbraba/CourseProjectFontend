import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const WritePostComponent = () => {

    const [dbpost, setDbpost] = useState(null)

    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [content, setContent] = useState(null)


    const [errorMessage, SetErrorMessage] = useState(null)
    const handleChange = (e, editor) => { setContent(editor.getData()) }


    const params = useParams()
    const { id } = params
    const { post } = params

    useEffect(() => {

        //Fetch the article to update if passed as parameter
        if (id) {

            GetPosiById()
        }
    }, [])

    useEffect(() => {

    }, [dbpost])

    async function GetPosiById() {
        try {

            if (post === "lecon") {
                //Fetch a course
                let response = await axios.get("https://localhost:7201/Course/Get?id=" + id)
                setDbpost(response.data)
            } else {
                //Fetch an article
                let response = await axios.get("https://localhost:7201/Article/Article?id=" + id)
                setDbpost(response.data)
            }


        } catch (error) {
            SetErrorMessage("Une erreur est survenue lors de la récuperation du post")
            setDbpost(null)
        }


    }

    async function UpdateArticle() {
        try {
            var response = await axios.put("https://localhost:7201/Article/Update?id=" + id, {
      
                "title": "string",
                "description": "strinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrin",
                "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "content": "strinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrinstrin",
                "updatedAt": "2024-06-23T09:49:03.559Z",
    
            })
            console.log(response);



        } catch (error) {
            console.log(error);
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


            <div className='form-group mb-5'>
                <label className='me-5' htmlFor=""> Titre de l'article</label>
                <input type='richtext' className='login-input title-input' defaultValue={dbpost ? dbpost.title : ""} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className='form-group mb-5'>
                <label className='me-5' htmlFor="" > Description</label>
                <textarea type='text' className='login-input description-input' defaultValue={dbpost ? dbpost.description : ""} placeholder='Decrivez votre article en quelques lignes' onChange={(e) => setDescription(e.target.value)} />
            </div>



            <CKEditor editor={ClassicEditor}
                onChange={(e, editor) => { handleChange(e, editor) }}
                data={dbpost ? dbpost.content : ""}

            ></CKEditor>

            <button className='mb-5 btn btn-primary' onClick={() => { UpdateArticle() }}> Editer l'article </button>

            {!dbpost && errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}

        </div>
    )
}

export default WritePostComponent