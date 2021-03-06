import React, { Component } from 'react';
import { useState, useEffect } from "react";
import NaviBar from "../Components/NaviBar";
import { Button, TextField, Grid } from '@material-ui/core';
import Question from './ComponentsForUni/Question'
import axios from "axios";
import { Redirect } from 'react-router-dom';

function ForUni() {

    const [questions, setQuestions] = useState([]);

    var userString = localStorage.getItem("session");
    var user_id ;
    var userName;
    if(userString){
        user_id = JSON.parse(userString).id;
        userName = JSON.parse(userString).username;
        // console.log(user_id);
    }
    // const user_id = "5ffa6b98f96818c0e006c1a9";



    useEffect(()=>{
        axios.get('http://localhost:8080/question/')
        .then(function (response) {
            let questionsTextArray = response.data.map((elm)=>elm.questionText);
            let idArray = response.data.map((elm)=>elm._id)
            let nameArray = response.data.map((elm)=>elm.userName)
            // console.log("aca es:")
            // console.log(nameArray);
            let questionArray = []
            for (let index = 0; index < questionsTextArray.length; index++) {
                const element = [questionsTextArray[index],idArray[index],nameArray[index]];
                questionArray.push(element);
            }
            questionArray.reverse();
            setQuestions(questionArray);
            // console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }, [])

    const enviarPregunta = () => {
        var element = document.getElementById("entradaTexto")
        var questionText = element.value
        var id_element
        axios.post('http://localhost:8080/question/add/', {
            user_id:user_id,
            userName:userName,
            questionText:questionText
        })
            .then(function (response) {
                id_element = response.data._id
                console.log(response);
                var elm = questions
                elm = [[questionText, id_element, userName]].concat(elm)
                console.log(elm)
                setQuestions(elm)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    
    if(localStorage.getItem("session")) {
        return(
            <div>
                <NaviBar />
                <div id="contenedor-pregunta">
                    <form id="form_pregunta">
                        <span id="descripcionPregunta">Realiza una pregunta</span>
                        <input id="entradaTexto" type="text" name="name" size="100"/>
                        <button id="boton" type="button" onClick={()=>enviarPregunta()}>Preguntar</button>
                    </form>
                </div>
                <div id="seccion-preguntas">
                    {questions.map(elm => <Question id={elm[1]} pregunta={elm[0]} autor={elm[2]}/>) }
                </div>
            </div>          
            );
    } else {
        return <Redirect to= "/LogIn"/>
    }

}
// constructor(props) {
//     super(props)
//     this.state = {info: ['', '', '']}

// }

export default ForUni;
    