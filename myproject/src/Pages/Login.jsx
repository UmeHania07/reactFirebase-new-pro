import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { UseFirebaseContext } from '../Context/Firebase'
import { useNavigate } from 'react-router-dom';




function Login() {
    const Firebase = UseFirebaseContext();
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
  useEffect(() => {
  if(Firebase.isLoggedIn){
    //agr user login hoga to wo sedha Home page pe navigate hoga
    //Navigate to Home Page
    navigate('/')
  }
  }, [Firebase, navigate])



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login User")
        const result = await Firebase.signInEandP(email, password)
        console.log("Successfull Login", result)
    }


    return (
        <div className='container mt-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                </Form.Group>
                <Button  variant="primary" type="submit">
                    Log In Account
                </Button>
            </Form>
            <h1 className='mt-5 mb-5'>OR</h1>
            <Button onClick={Firebase.SigninwithGoogle}  variant='danger'>Signin with Google</Button>
        </div>
    )
}

export default Login

