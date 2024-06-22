import React from 'react'
import WritePostComponent from '../Components/WritePostComponent'
import { Link } from 'react-router-dom'

const WritePostPage = () => {
  return (
    <>
    <WritePostComponent></WritePostComponent>
    <Link to={"/admin-index"} className='btn btn-primary '> Retour à l'index </Link>
    </>
  )
}

export default WritePostPage