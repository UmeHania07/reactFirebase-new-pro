import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { UseFirebaseContext } from '../Context/Firebase';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


// book page mai jo book.id hy osi ko yaha render krwarhy hn
function BooksCards(props) {

  const Firebase = UseFirebaseContext()

  const navigate = useNavigate()

  const [url, setURL] = useState(null)

  useEffect(() => {
    Firebase.getImageURL(props.imageURL).then((url) => setURL(url))


  }, [])
  return (

    <Card style={{ width: '18rem', margin: '10px', padding:"5px"}}>
      {/* yaha pr picture ka url deke pic ko render krwaty hn */}
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has a title {props.name} and this book is sold by {props.displayName} this book costs Rs.{props.price}
        </Card.Text>
        <Button  onClick={(e) => navigate(`/book/view/${props.id}`)}  variant="primary" >
          View
        </Button>
      </Card.Body>
    </Card>

  )
}

export default BooksCards

