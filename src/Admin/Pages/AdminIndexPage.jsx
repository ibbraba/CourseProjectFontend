import React from 'react'
import AdminComponent from '../Components/ManagePostComponent'
import { Link } from 'react-router-dom'

const AdminIndexPage = () => {
  return (
    <div>
        <h1> Bienvenue sur l'espace administrateur</h1>

        <p>Que voulez-vous faire ? </p>

        <ul>
            <Link to={"/admin-manage"}>Gerer les posts </Link>
            <Link to={"/admin-create"}>Ajouter un post </Link>

        </ul>

    </div>

  )
}

export default AdminIndexPage