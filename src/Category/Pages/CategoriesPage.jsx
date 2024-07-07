import React from 'react'
import CategoryComponent from '../Compnents/CategoryComponent'

const CategoriesPage = () => {
  return (
    <>
    <div className='post-presentation mb-5'> 
    <h1 className='mb-2'>Categories</h1>

    Explorez l'univers du développement sous toutes ses formes. Frontend, backend, cloud ou base de données. Retrouvez articles et tutoriels sur le domainde de votre choix.
    
    </div>
    <CategoryComponent></CategoryComponent>
    </>
  )
}

export default CategoriesPage