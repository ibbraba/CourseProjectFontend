import axios from 'axios'
import { Alert } from 'bootstrap'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export async function IsAdminLoggedIn() {
    const token = localStorage.getItem('LoginToken')
  
    if (!token) {

      return false
    } else {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get("https://localhost:7201/User/Validate")
        //Returns true
        return response.data


      } catch (error) {
        return false
      }

    }
  }
  
  export function RemoveLocalToken() {

    if(window.confirm("Se déconnecter ?")){

      const tokenName = "LoginToken"
      const token = localStorage.getItem(tokenName)
      if (token) {
        localStorage.removeItem(tokenName)
      }
      
    }

  }



const LoginComponent = () => {

    const [pseudo, setPseudo] = useState(null)
    const [password, setPassword] = useState(null)
    const [errorMessage, SetErrorMessage] = useState(null)

    const navigate = useNavigate()


   async function Login(){

        try {
            var response = await axios.post(`https://localhost:7201/User?login=${pseudo}&password=${password}`)
            
            //Set retuned token in local storage 
            console.log("Login success");
            localStorage.setItem("LoginToken", response.data)
            navigate("/")
            

        } catch (error) {
            console.log(error);
           SetErrorMessage(error.response.data)
        }
   } 

  return (
    <div >

    {errorMessage && <div className='alert alert-danger' > {errorMessage} </div>}

    <h3> Connectez-vous </h3>

    <div>
      <form>
        <label> Pseudo </label>
        <input className='login-input' type='text' onChange={(event) => setPseudo(event.target.value)} name='pseudo' />

        <label> Mot se passe </label>
        <input className='login-input' type='password' onChange={(event) => setPassword(event.target.value)} name='password' />

        <button type='submit' className='btn btn-primary lbutton darkbg' onClick={(event) => {
          event.preventDefault()
          Login()
        }}> Se connecter </button>
      </form>

    </div>
  </div>
  )
}

export default LoginComponent