import React from 'react'
import LessonComponent from '../Components/LessonComponent'

const LeconPage = () => {
  return (
    <>
    <div className='post-presentation mb-5'> 
    <h1 className='mb-2'>Leçons</h1>
      Les tutoriels proposés sont conçus pour tout niveaux. Se concetrant sur un point spéciique, ces articles vous aideront à comprendre le principe, l'implémentation et les avantages de nombreuses fonctionalités liées à la programmation.   </div>
    <LessonComponent></LessonComponent>
    </>
  )
}

export default LeconPage