import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { UseFirebaseContext } from '../Context/Firebase'

function List() {

const firebase = UseFirebaseContext()

    const [name, setName] = useState("")
    const [isbnNumber, setisbnNumber] = useState("")
    const [price, setPrice] = useState("")
    const [coverPic, setCoverPic] = useState("")

    const handleSubmit = async(e) => {
   e.preventDefault();
   await firebase.handleCreateNewList(name , isbnNumber , price, coverPic)
    }

    return (
        <div className='container mt-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Book Name</Form.Label>
                    <Form.Control onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter Book Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>ISBN Number</Form.Label>
                    <Form.Control onChange={(e) => setisbnNumber(e.target.value)} value={isbnNumber} type="text" placeholder="Enter ISBN Number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Book Price</Form.Label>
                    <Form.Control onChange={(e) => setPrice(e.target.value)} value={price} type="text" placeholder="Enter book Price" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Cover Picture</Form.Label>
                    <Form.Control onChange={(e) => setCoverPic(e.target.files[0])} type="file" />
                </Form.Group>

                
                <Button variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>

        </div>
    )
}

export default List
