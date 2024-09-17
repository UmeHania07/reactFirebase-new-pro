import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function MyNavbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        
        <Nav className="me-auto">
          {/* ye react-boostrap ki class h  */}
          <Nav.Link active href="/">Home</Nav.Link>
          <Nav.Link href="/list">Add Listing</Nav.Link>
          

        </Nav>
      </Container>
    </Navbar>
  )
}

export default MyNavbar
