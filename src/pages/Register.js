import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Register() {
    const intialValue = {
        username: "",
        password: "",
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("Username cannot be a Blank..!!"),
        password: Yup.string().min(4).max(20).required("Password cannot be a Blank..!!"),
    });

    const navigate= useNavigate();

    const onSubmit = (data)=>{
        axios.post("http://localhost:5000/auth", data).then((response)=>{
            navigate("/login");
        })
    }



    return (
        <div>
            <Formik initialValues={intialValue} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <label >Username:</label>
                    <ErrorMessage name='username' component="span"/>
                    <Field id="inputCreatePost" name="username" placeholder="(Example. john_123 )" autoComplete="off" />
                    <label >Password:</label>
                    <ErrorMessage name='password' component="span"/>
                    <Field id="inputCreatePost" name="password" placeholder="(Example. Your password )" autoComplete="off" type="password"/>

                    <button type='submit'>Register</button>

                </Form>

            </Formik>
        </div>
    )
}

export default Register
