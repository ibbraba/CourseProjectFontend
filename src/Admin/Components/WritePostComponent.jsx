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
    const [successMessage, setSuccessMessage] = useState(null)

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
        if (dbpost) {

            console.log(dbpost);
            setSelectedType(dbpost.type)
            setDifficulty(dbpost.difficulty)
        }
        if (categories) {
            console.log(categories);
        }
    }, [dbpost, categories])

    useEffect(() => {


        console.log("selectedType: " + selectedType);

    }, [selectedCategory, selectedType])

    useEffect(() => {

        console.log(successMessage);
    }, [successMessage])

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

    async function CreatePost() {
        console.log("Category " + selectedCategory);
        console.log("Type: " + selectedType);
        console.log("Title: " + title);
        console.log("Description: " + description);
        console.log("Content :" + content);

        //Eartly return empty content
        console.log(content);
        if (content === null) {
            SetErrorMessage("Veuillez entrez du contenu")
            setSuccessMessage(null)
            return
        }

        var category = categories.filter((x) => x.title === selectedCategory)
        let token = localStorage.getItem("LoginToken")
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;



        try {
            if (selectedType == "article") {
                console.log("Creating article ...");
                let response = await axios.post("https://localhost:7201/Article/Create", {
                    "title": title,
                    "description": description,
                    "categoryId": category[0].categoryId,
                    "content": content
                })
                console.log(response);
                if (response.status == 200) {
                    console.log("Response success");
                    setSuccessMessage("Article crée avec succées")
                    SetErrorMessage(null)
                }

            } else {
                console.log("Creating Lesson ...");
                let response = await axios.post("https://localhost:7201/Course/Create", {
                    "title": title,
                    "description": description,
                    "categoryId": category[0].categoryId,
                    "content": content,
                    "difficulty": difficulty,
                    "linkToRepository": linkToRepository ? linkToRepository : "none"
                })
                if (response.status == 200) {
                    setSuccessMessage("Leçon crée avec succées")
                    SetErrorMessage(null)
                }
                console.log(response);


            }

        } catch (error) {
            SetErrorMessage("Une erreur est survenue lors de la creation de la publication")
            setSuccessMessage(null)
        }
    }


    async function UpdatePost() {

        //Find Category 

        var category = categories.filter((x) => x.title === selectedCategory)
        console.log(category);


        console.log("Type: " + dbpost.type);
        console.log("Title: " + title);
        console.log("Description: " + description);
        console.log("Content :" + content);

        //Eartly return empty content
        if (content === null) {
            SetErrorMessage("Veuillez entrez du contenu")
            setSuccessMessage(null)
            return
        }
        try {


            //Add JWT to request header
            let token = localStorage.getItem("LoginToken")
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log("Selected type : " + selectedType);
            //Updates Article
            if (selectedType == "Article") {

                console.log("Updating article ...");
                let response = await axios.put("https://localhost:7201/Article/Update?id=" + id, {
                    "title": title ? title : dbpost.title,
                    "description": description ? description : dbpost.description,
                    "categoryId": selectedCategory ? category[0].categoryId : dbpost.categoryId,
                    "content": content ? content : dbpost.content
                })

                console.log(response);

                if (response.status == 200) {
                    setSuccessMessage("Article modifié avec succées")
                    SetErrorMessage(null)
                }
            }

            //Updates Lesson
            else if (selectedType == "Leçon") {
                console.log("Updating lesson");
        
               console.log("Difficulty : " + difficulty);
                let response = await axios.put("https://localhost:7201/Course/Update?courseId=" + id, {
                    "title": title ? title : dbpost.title,
                    "description": description ? description : dbpost.description,
                    "categoryId": selectedCategory ? category[0].categoryId : dbpost.categoryId,
                    "content": content ? content : dbpost.content,
                    "difficulty": difficulty,
                    "tested": true,
                    "linkToRepository": linkToRepository ? linkToRepository : dbpost.linkToRepository
                })

                
                console.log(response);
                if (response.status == 200) {
                    setSuccessMessage("Leçon modifiée avec succées")
                    SetErrorMessage(null)
                }
            }
        } catch (error) {
            SetErrorMessage("Une erreur est survenue lors de la modification de la publication")
            setSuccessMessage(null)
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
        <div>

            {/* Presentation */}

            {dbpost &&
                <div>
                    <h2>Editer une publication</h2>
                    <h3> {dbpost.title}</h3>

                </div>
            }

            {!dbpost &&
                <div> <h2>Nouvelle publication</h2> </div>
            }


            {/* Formulaire */}
            <form className='needs-validation' onSubmit={(e) => {
                e.preventDefault()
                { dbpost ? UpdatePost() : CreatePost() }
            }}  >
                <div className='form-group mb-5'>
                    <label htmlFor=""> Categorie </label>
                    <select onChange={(e) => setSelectedCategory(e.target.value)} className='form-control' name="CategorySelect" required>
                        <option value="" selected={true} > Selectioner une categorie </option>
                        {categories && categories.map(category =>

                            <option key={category.id} selected={dbpost && category.categoryId === dbpost.categoryId ? true : false} value={category.id} defaultValue={dbpost ? dbpost.categoryId : null}> {category.title}</option>

                        )}  </select>
                </div>

                <div className='form-group mb-5'>

                    <select className='form-control form-group' disabled={dbpost ? true : false} name="TypeSelect" onChange={(e) => setSelectedType(e.target.value)} defaultValue={post} required>
                        <option value="" > Selectioner un type </option>
                        <option key="Article" value="article"> Article </option>
                        <option key="Leçon" value="Leçon" > Leçon </option>
                    </select>
                </div>


                {selectedType == "Leçon" &&
                    <div className='form-group mb-5'>
                        <select className='form-control' onChange={(e) => setDifficulty(e.target.value)} required>
                            <option value="" selected={true} > Selectioner un niveau </option>
                            <option key="Facile" selected={dbpost && dbpost.difficulty === "Facile" ? true : false} value="Facile"> Facile </option>
                            <option key="Intermediaire" selected={dbpost && dbpost.difficulty === "Intermédiaire" ? true : false} value="Intermédiaire"> Intermédiaire </option>
                            <option key="Difficile" selected={dbpost && dbpost.difficulty === "Difficile" ? true : false} value="Difficile"> Difficile </option>
                        </select>
                    </div>
                }


                <div className='form-control form-group mb-5'>
                    <label className='me-5' htmlFor=""> Titre de l'article</label>
                    <input type='richtext' className='login-input title-input form-control' defaultValue={dbpost ? dbpost.title : ""} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className='form-control form-group mb-5'>
                    <label className='me-5' htmlFor="" > Description</label>
                    <textarea type='text' className='form-control login-input description-input' defaultValue={dbpost ? dbpost.description : ""} placeholder='Decrivez votre article en quelques lignes' onChange={(e) => setDescription(e.target.value)} required />
                </div>



                <CKEditor editor={ClassicEditor}
                    onChange={(e, editor) => { handleChange(e, editor) }}
                    data={dbpost ? dbpost.content : ""}

                ></CKEditor>

                {selectedType === "Leçon" &&
                    <div className='form-control form-group mb-5'>
                        <label className='me-5' htmlFor=""> Lien du repository</label>
                        <input type='richtext' className='form-control login-input title-input' defaultValue={dbpost ? dbpost.linkToRepository : ""} onChange={(e) => setLinkToRepository(e.target.value)} required />
                    </div>
                }

                <div className='form-gorup'>

                    {dbpost &&

                        <button type='submit' className='mb-5 btn btn-primary'> Editer  </button>
                    }

                    {!dbpost && <button type='submit' className='mb-5 btn btn-primary'> Créer </button>}


                </div>



            </form>

            {/* Actions */}


            {/* Message success and failure */}

            {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
            {successMessage && <div className='alert alert-success'> {successMessage} </div>}




        </div>
    )
}

export default WritePostComponent