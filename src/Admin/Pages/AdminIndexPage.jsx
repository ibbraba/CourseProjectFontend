import React, { useEffect, useState } from 'react'
import AdminComponent from '../Components/ManagePostComponent'
import { Link, useNavigate } from 'react-router-dom'
import { IsAdminLoggedIn, RemoveLocalToken } from '../../App/Components/LoginComponent'

const AdminIndexPage = () => {

  const [adminLoggedIn, setAdminLoggedIn] = useState(null)
  const navigate = useNavigate()

 

  useEffect(() => {

    //Check if the token is valid and tells if admin is logged in accordingly
      CheckLoggedin()
  },[])

  useEffect(() => {

    // Redirects to login page if admin not connected
    if(adminLoggedIn != null && adminLoggedIn != true) {
  
      navigate("/login")

    }
  }, [adminLoggedIn])

  async function CheckLoggedin(){
    var response = await IsAdminLoggedIn()
    setAdminLoggedIn(response)

  }

  function Logout(){
    RemoveLocalToken()
    navigate("/")
  }

  return (
    <div>
        <h1> Bienvenue sur l'espace administrateur</h1>

        <p>Que voulez-vous faire ? </p>

        <ul>
            <Link to={"/admin-manage"}>Gerer les posts </Link>
            <Link to={"/admin-create"}>Ajouter un post </Link>
            <button className='alert alert-danger' onClick={() => Logout()}> Se deconnecter </button>

        </ul>

    </div>

  )
}

export default AdminIndexPage