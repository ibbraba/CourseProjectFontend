import React, { useState } from 'react'

 //Return the path of the image associated with the post
 export function getImagePath(categoryTitle) {

    if(categoryTitle === "Tutorials"){
        return "/public/images/code.jpg"
    }else if(categoryTitle === ".NET Articles "){
        return "/public/images/net.png"
    }else if(categoryTitle === "Frontend tips"){
        return "/public/images/logoReact.png"
    }else if(categoryTitle === "Cloud"){
        return "/public/images/cloud.png"
    }else{
        return "/public/images/code.jpg"
    }
    

}

const ImageHook = () => {
  

   

}

export default ImageHook