import React from 'react'
import ManagePostComponent from '../Components/ManagePostComponent'
import { Link } from 'react-router-dom'

const PostManagementPage = () => {
  
   
    return (
      <>
        <ManagePostComponent></ManagePostComponent>
        <Link to={"/admin-index"} className='btn btn-primary '> Retour à l'index </Link>
        </>
  )
}

export default PostManagementPage