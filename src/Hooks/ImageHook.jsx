import React, { useState } from 'react'

 //Return the path of the image associated with the post
 export function getImagePath(categoryTitle) {

    if(categoryTitle === "Tutorials"){
        return "/CourseProjectFontend/images/code.jpg"
    }else if(categoryTitle === ".NET Articles "){
        return "/CourseProjectFontend/images/net.png"
    }else if(categoryTitle === "Frontend tips"){
        return "/CourseProjectFontend/images/logoReact.png"
    }else if(categoryTitle === "Cloud"){
        return "/CourseProjectFontend/images/cloud.png"
    }else{
        return "/CourseProjectFontend/images/code.jpg"
    }
    

}

const ImageHook = () => {
  

   

}

export default ImageHook