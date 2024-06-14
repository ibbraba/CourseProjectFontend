import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import IndexPage from './Pages/IndexPage'
import LeconPage from './Lessons/Pages/LeconPage'
import ArticlePage from './Article/Pages/ArticlePage'
import CategoriesPage from './Category/Pages/CategoriesPage'
import PresentationPage from './App/Pages/PresentationPage'
import MentionsLegalesPage from './App/Pages/MentionsLegalesPage'
import PolitiquePage from './App/Pages/PolitiquePage'

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
        <Route path='/' element={<IndexPage></IndexPage>}></Route>
        <Route path='/lecons' element={<LeconPage></LeconPage>}></Route>
        <Route path='/articles' element={<ArticlePage></ArticlePage>}></Route>
        <Route path='/categories' element={<CategoriesPage></CategoriesPage>}></Route>
        <Route path='/presentation' element={<PresentationPage></PresentationPage>}></Route>


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
