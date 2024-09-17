import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UseFirebaseContext } from '../Context/Firebase'
import { Button , Form} from 'react-bootstrap'

function Details() {
    const params = useParams()

    const Firebase = UseFirebaseContext()

    const [data, setData] = useState(null)
    const [url, setURL] = useState(null)
    const [qty, setQty] = useState(1)



    useEffect(() => {
        Firebase.getDocument(params.bookId)
            .then((value) => setData(value.data()))
    }, [])

    useEffect(() => {
        if (data) {
            const imageURL = data.imageURL;
            Firebase.getImageURL(imageURL).then((val) => setURL(val))
        }

    }, [data])

    if (data == null) return <h1>Loadding....</h1>

    console.log(data)

    const placeOrder = async() => {
      const result = await Firebase.placeOrder(params.bookId, qty)
      console.log(result)
    }

    return (
        <div className='container mt-5'>
            <h1>{data.name}</h1>
            <img src={url} width="40%" style={{ borderRadius: "10px" }} />

            <h1>Details</h1>

            <h4>Price Rs. {data.price}</h4>

            <h1>Owner Details</h1>
            <p>Name : {data.displayName}</p>
            <p>Email : {data.userEmail}</p>

            <Form >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control onChange={(e) => setQty(e.target.value)} value={qty} type="number" placeholder="Enter Quantity" />
                </Form.Group>
            </Form>

            <Button  onClick={placeOrder}  variant='success'>Buy Now</Button>
           


        </div>
    )
}

export default Details
