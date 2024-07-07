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
import SingleCategoryPage from './Category/Pages/SingleCategoryPage'
import SingleLeconPage from './Lessons/Pages/SingleLeconPage'
import AdminIndexPage from './Admin/Pages/AdminIndexPage'
import PostManagementPage from './Admin/Pages/PostManagementPage'
import WritePostPage from './Admin/Pages/WritePostPage'
import LoginPage from './App/Pages/LoginPage'

function App() {
 

  return (
    <>

      <header>




      <div className="header-menu">

      <h1>Didacts</h1>
      <p>By Ibra-Alpha</p>

          <ul className='header-menu-list'>
   
          </ul>
      </div>

      <div className='header-links'>
      <Link to={'/lecons'}> Leçons </Link>
              <Link to={'/articles'}> Articles </Link>
              <Link to={'/categories'}> Categories </Link>
              
      </div>
      </header>

      <div className="page-content">
      <Routes>

        {/* Index */} 
        <Route path='/' element={<ArticlePage></ArticlePage>}></Route>


        {/* Article */}
        <Route path='/article/:category/:id' element={<SingleArticlePage></SingleArticlePage>}></Route>
        <Route path='/articles' element={<ArticlePage></ArticlePage>}></Route>
        <Route path='/articles/:id' element={<ArticlePage></ArticlePage>}></Route>

        {/* Categories */}
        <Route path='/categories' element={<CategoriesPage></CategoriesPage>}></Route>
        <Route path='/category/:id' element={<SingleCategoryPage></SingleCategoryPage>}></Route>

        {/* Lessons */}
        <Route path='/lecons' element={<LeconPage></LeconPage>}></Route>
        <Route path='/lecon/:category/:id' element={<SingleLeconPage></SingleLeconPage>}></Route>


        {/* Presentation  */}
        <Route path='/presentation' element={<PresentationPage></PresentationPage>}></Route>


        {/* Admin */}
        <Route path='/admin-index' element={<AdminIndexPage></AdminIndexPage>}></Route>
        <Route path='/admin-manage' element={<PostManagementPage></PostManagementPage>}></Route>
        <Route path='/admin-create' element={<WritePostPage></WritePostPage>}></Route>
        <Route path='/admin-create/:post/:id' element={<WritePostPage></WritePostPage>}></Route>

        {/* Other  */}
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/mention-legales' element={<MentionsLegalesPage></MentionsLegalesPage>}></Route>
        <Route path='/politique-confidentialite' element={<PolitiquePage></PolitiquePage>}></Route>

      </Routes>
      </div>


      <footer>

          <div className="mentions">

            Didacts - Créé par BA Ibra-Alpha


          </div>


      </footer>
    </>
  )
}

export default App
