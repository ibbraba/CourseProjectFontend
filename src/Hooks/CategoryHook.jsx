import axios from 'axios';
import React from 'react'

export async function useFetchCategories(){
    try {
        console.log("Fetching categories ...")
        var response = await axios.get("https://courseprojectwebapp.azurewebsites.net/CategoryContoller/GetCategories")

        return [response.data]

    } catch (error) {
        console.log(error);
    }
}
const CategoryHook = () => {

}

export default CategoryHook