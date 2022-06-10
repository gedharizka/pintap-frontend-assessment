import {Link} from 'react-router-dom'
import React from 'react'
import {
  Container,
  Row,
  Col,
  Navbar
} from 'reactstrap'

const HeaderMenu = ({countCart}) => {

  return (
    <Navbar className='navbar-expand-lg navbar-light bg-light'>
      
        <Container className='px-4 px-lg-5'>
          <Row className='justify-content-between'>
            <Col>
              <Link to='/'>
                <h5>My Commerce</h5>
              </Link>
            </Col>
            
            <Col className='d-flex justify-content-end'>
              <Link to='cart'>
              <button className="btn btn-outline-dark" type="submit">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span  className="badge bg-dark text-white ms-1 rounded-pill">{countCart}</span>
              </button>
              </Link>
            </Col>
          </Row>
        </Container>
          
    </Navbar>
  )
}

export default HeaderMenu