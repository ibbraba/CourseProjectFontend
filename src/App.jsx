import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'

import LeconPage from './Lessons/Pages/LeconPage'
import ArticlePage from './Article/Pages/ArticlePage'
import CategoriesPage from './Category/Pages/CategoriesPage'
import PresentationPage from './App/Pages/PresentationPage'
import MentionsLegalesPage from './App/Pages/MentionsLegalesPage'
import PolitiquePage from './App/Pages/PolitiquePage'
import IndexPage from './App/Pages/IndexPage'
import SingleArticlePage from './Article/Pages/SingleArticlePage'

function App() {
 

  return (
    <>

      <header>

      <h1>Didacts</h1>
      <p>By Ibra-Alpha</p>


      <div className="header-menu">

          <ul className='header-menu-list'>
              <li> Leçons </li>
              <li> Articles </li>
              <li> Categories </li>
              <li> Présentation </li>
          </ul>
      </div>

      </header>

      <Routes>

        {/* Index */} 
        <Route path='/' element={<IndexPage></IndexPage>}></Route>


        {/* Article */}
        <Route path='/article/:id' element={<SingleArticlePage></SingleArticlePage>}></Route>
        <Route path='/articles' element={<ArticlePage></ArticlePage>}></Route>

        {/* Categories */}
        <Route path='/categories' element={<CategoriesPage></CategoriesPage>}></Route>

        {/* Lessons */}
        <Route path='/lecons' element={<LeconPage></LeconPage>}></Route>


        {/* Presentation  */}
        <Route path='/presentation' element={<PresentationPage></PresentationPage>}></Route>


        {/* Other  */}
        <Route path='/mention-legales' element={<MentionsLegalesPage></MentionsLegalesPage>}></Route>
        <Route path='/politique-confidentialite' element={<PolitiquePage></PolitiquePage>}></Route>

      </Routes>



      <footer>

          <div className="mentions">

            <a href="">Mentions légales</a>
            <a href=""> Politique de confidentialité</a>


          </div>


      </footer>
    </>
  )
}

export default App
