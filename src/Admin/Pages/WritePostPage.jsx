import React, { useEffect, useState } from 'react'
import WritePostComponent from '../Components/WritePostComponent'
import { Link, useNavigate } from 'react-router-dom'
import { IsAdminLoggedIn } from '../../App/Components/LoginComponent'

const WritePostPage = () => {

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
    <WritePostComponent></WritePostComponent>
    <Link to={"/admin-index"} className='btn btn-primary '> Retour à l'index </Link>
    </>
  )
}

export default WritePostPage