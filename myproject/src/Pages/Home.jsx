import React, { useEffect, useState } from 'react'
import { UseFirebaseContext } from '../Context/Firebase'
import BooksCards from '../Components/BooksCards'
import CardGroup from 'react-bootstrap/CardGroup';


function Home() {

    const Firebase = UseFirebaseContext()

    const [books, setBooks] = useState([])

    useEffect(() => {

        Firebase.ListAllBooks().then((books) => setBooks(books.docs))


    }, [])

    return (
        <div className='container mt-5'>
            <CardGroup>
                {books.map((book) => (

                    //ye maine props k zariyee bookscard se tranfer kiya h
                    <BooksCards key={book.id} id={book.id}  {...book.data()} />
                ))}
            </CardGroup>
        </div >
    )
}

export default Home
