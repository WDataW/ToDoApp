import { useReducer } from "react";
export function useValidation(){
    const [state, dispatch] = useReducer(passwordReducer, "");
    return [state, dispatch];
}


export function validatePassword(password, dispatch){
    if(password.length==0){
        dispatch({
            type:"",
        });
    }
    else if(containsIllegalChar(password)){
        dispatch({
            type : "containsIllegalChar"
        });
    
    }else if( password.length<8 || password.length>64){
        dispatch({
            type : "invalidLength"
        });

    }else if(!containsUpperCase(password)){
        dispatch({
            type : "missingUppercase"
        });

    }else if(!containsLowerCase(password)){
        dispatch({
            type : "missingLowercase"
        });

    }else if(!containsDigit(password)){
        dispatch({
            type : "missingDigit"
        });

    }else if(!containsSpecialChar(password)){
        dispatch({
            type : "missingSpecialChar"
        });
    }else{
        dispatch({
            type : ""
        });
    }
}
function passwordReducer(state ,action){
    switch(action.type){
        case "invalidLength":{
            return "Password must be between 8 and 64 characters";
        }
        case "missingUppercase":{
            return "Password must include at least one uppercase letter";
        }
        case "missingLowercase":{
            return "Password must include at least one lowercase letter";
        }
        case "missingDigit":{
            return "Password must include at least one digit";
        }
        case "missingSpecialChar":{
            return "Password must include at least one special character (!@#$%)";
        }
        case "containsIllegalChar":{
            return "Password can't contain illegal characters (space,./)";
        }
        default:{
            return "";
        }    
    }
}

const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
function containsUpperCase(password){
    for(let i=0; i< password.length; i++){
        const currentChar = password.charAt(i);
        if(!letters.includes(currentChar.toLowerCase()))continue;
        if(currentChar==currentChar.toUpperCase())return true;
    }
    return false;
}
function containsLowerCase(password){
    for(let i=0; i< password.length; i++){
        const currentChar = password.charAt(i);
        if(!letters.includes(currentChar.toLowerCase()))continue;
        if(currentChar==currentChar.toLowerCase())return true;
    }
    return false;
}
function containsDigit(password){
    for(let i=0; i< password.length; i++){
        const currentChar = password.charAt(i);
        if(!Number.isNaN(parseInt(currentChar)))return true;
    }
    return false;
}
function containsSpecialChar(password){
    const specialChars = ["!","@","#","$","%"]
    for(let i=0; i< password.length; i++){
        const currentChar = password.charAt(i);
        if(specialChars.includes(currentChar))return true;
    }
    return false;
}
function containsIllegalChar(password){
    const allowedChars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0","!","@","#","$","%"];
    for(let i=0; i< password.length; i++){
        const currentChar = password.charAt(i);
        if(!allowedChars.includes(currentChar.toLowerCase()))return true;
    }
    return false;
    
}