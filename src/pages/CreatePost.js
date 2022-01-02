import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function CreatePost() {
    const intialValue = {
        title:"",
        postText: "",
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title Must Be Given..!!"),
        postText: Yup.string().required("Post Content is Must..!!"),
    });

    const navigate= useNavigate();

    const onSubmit = (data)=>{
        axios.post("https://tutorial-blog-server.herokuapp.com/posts", data,{headers: {accessToken: localStorage.getItem("accesstoken")}}).then((response)=>{
            navigate("/");
        })
    }
    return (
        <div className='createPostPage'>
            <Formik initialValues={intialValue} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <label >Title:</label>
                    <ErrorMessage name='title' component="span"/>
                    <Field id="inputCreatePost" name="title" placeholder="(Example. john )" autoComplete="off"/>
                    <label >Post Content:</label>
                    <ErrorMessage name='postText' component="span"/>
                    <Field id="inputCreatePost" name="postText" placeholder="(Example. john is happy )" autoComplete="off" />
                    <button type='submit'>Submit Post</button>

                </Form>

            </Formik>
            
            
        </div>
    )
}

export default CreatePost
