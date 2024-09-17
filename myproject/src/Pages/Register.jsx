import React, { useState , useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { UseFirebaseContext } from '../Context/Firebase'
import {useNavigate } from 'react-router-dom'



function Register() {
    const Firebase = UseFirebaseContext();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate()

    useEffect(() => {
        if (Firebase.isLoggedIn) {
            //Navigate to Home Page
            navigate('/')
        }
    }, [Firebase, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("SignUp User")
        const result = await Firebase.signUpEandP(email, password)
        console.log("Successfull SignUp", result)
    }


    return (
        <div className='container mt-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
        </div>
    )
}

export default Register
