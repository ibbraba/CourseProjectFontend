import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginComponent from '../../App/Components/LoginComponent'

const WritePostComponent = () => {

    const [dbpost, setDbpost] = useState(null)

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedType, setSelectedType] = useState(null)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [content, setContent] = useState(null)
    const [difficulty, setDifficulty] = useState(null)
    const [linkToRepository, setLinkToRepository] = useState(null)

    const [errorMessage, SetErrorMessage] = useState(null)
    const handleChange = (e, editor) => { setContent(editor.getData()) }

    const [categories, setCategories] = useState(null)

    const params = useParams()
    const { id } = params
    const { post } = params

    useEffect(() => {
        GetAllCategories()

        //Fetch the article to update if passed as parameter
        if (id) {

            GetPosiById()
        }
    }, [])

    useEffect(() => {
    }, [dbpost, categories])

    useEffect(() => {

        console.log(selectedCategory);
        console.log(selectedType);

    }, [selectedCategory, selectedType])

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

        console.log("Category " + selectedCategory);
        console.log("Type: " + post);
        console.log("Title: " + title);
        console.log("Description: " + description);
        console.log("Content :" + content);

        try {
            //Find Category 

            var category = categories.filter((x) => x.title === selectedCategory)
            console.log(category);

            let token = localStorage.getItem("LoginToken")
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            var response = await axios.put("https://localhost:7201/Article/Update?id=" + id, {

                "title": title ? title : dbpost.title,
                "description": description ? description : dbpost.description,
                "categoryId": category[0].categoryId ? category[0].categoryId : dbpost.categoryId,
                "content": content ? content : dbpost.content


            })
            console.log(response);




        } catch (error) {
            console.log(error);
        }
    }

    async function CreatePost() {
        console.log("Category " + selectedCategory);
        console.log("Type: " + selectedType);
        console.log("Title: " + title);
        console.log("Description: " + description);
        console.log("Content :" + content);

        var category = categories.filter((x) => x.title === selectedCategory)
        let token = localStorage.getItem("LoginToken")
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
            if (selectedType === "article") {
                console.log("Creating article ...");
                let response = await axios.post("https://localhost:7201/Article/Create", {
                    "title": title,
                    "description": description,
                    "categoryId": category[0].categoryId,
                    "content": content
                })
                console.log(response);
            } else {
                console.log("Creating Lesson ...");
                let response = await axios.post("https://localhost:7201/Course/Create", {
                    "title": title,
                    "description": description,
                    "categoryId": category[0].categoryId,
                    "content": content,
                    "difficulty" : difficulty, 
                    "linkToRepository" : linkToRepository
                })
                console.log(response);


            }

        } catch (error) {
            console.log(error);
        }
    }

    async function GetAllCategories() {
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
        <div>WritePostComponent
            {dbpost &&
                <div>
                    <h3> {dbpost.title}</h3>

                </div>
            }

            <div className='form-group mb-5'>
                <label htmlFor=""> Categorie </label>
                <select onChange={(e) => setSelectedCategory(e.target.value)}>   {categories && categories.map(category =>

                    <option key={category.id} value={category.id} defaultValue={dbpost ? dbpost.categoryId : null}> {category.title}</option>

                )}  </select>
            </div>

            <div className='form-group mb-5'>
                <select onChange={(e) => setSelectedType(e.target.value)} defaultValue={post}>
                    <option key="article" value="article"> Article </option>
                    <option key="Lecon" value="Lecon"> Leçon </option>
                </select>
            </div>


            {selectedType == "Lecon" && 
                <div className='form-group mb-5'>
                <select onChange={(e) => setDifficulty(e.target.value)} defaultValue="Facile">
                    <option key="article" value="Facile"> Facile </option>
                    <option key="Lecon" value="Intermédiaire"> Intermédiaire </option>
                    <option key="Lecon" value="Difficile"> Difficile </option>
                </select>
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

            {selectedType === "Lecon" && 
            <div className='form-group mb-5'>
                <label className='me-5' htmlFor=""> Lien du repository</label>
                <input type='richtext' className='login-input title-input' defaultValue={""} onChange={(e) => setLinkToRepository(e.target.value)} />
            </div>
            }

            {dbpost &&

                <button className='mb-5 btn btn-primary' onClick={() => { UpdateArticle() }}> Editer  </button>
            }

            {!dbpost && !errorMessage && <button className='mb-5 btn btn-primary' onClick={() => { CreatePost() }}> Créer </button>}

            {!dbpost && errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}

        </div>
    )
}

export default WritePostComponent