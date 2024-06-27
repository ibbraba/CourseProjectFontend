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
    console.log("Logging out ....");
    RemoveLocalToken()
    navigate("/")
  }

  return (
    <div>
        <h1> Bienvenue sur l'espace administrateur</h1>

        <p>Que voulez-vous faire ? </p>

        <ul>
            <Link className='btn btn-primary' to={"/admin-manage"}>Gerer les posts </Link>
            <Link className='btn btn-info' to={"/admin-create"}>Ajouter un post </Link>
            <Link className='btn btn-danger' onClick={() => Logout()}> Se deconnecter </Link>

        </ul>

    </div>

  )
}

export default AdminIndexPage