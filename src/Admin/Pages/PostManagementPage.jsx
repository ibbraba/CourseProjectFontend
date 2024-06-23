import React, { useEffect, useState } from 'react'
import ManagePostComponent from '../Components/ManagePostComponent'
import { Link, useNavigate } from 'react-router-dom'
import { IsAdminLoggedIn } from '../../App/Components/LoginComponent'

const PostManagementPage = () => {

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


  return (
      <>
        <ManagePostComponent></ManagePostComponent>
        <Link to={"/admin-index"} className='btn btn-primary '> Retour à l'index </Link>
        </>
  )
}

export default PostManagementPage