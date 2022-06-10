import React from 'react'
import {Row, Col} from 'reactstrap'

const CartDetail = (props) => {
  const {data, addCart,count} = props
  return (
    <>
      <Row>
        <Col md="6">
          <img className="card-img-top mb-5 mb-md-0" src={data.thumbnail} alt="..." />
        </Col>

        <Col md="6" className='align-self-center'>
          <div className="small mb-1">{data.category}</div>
          <h1 className="display-5 fw-bolder">{data.title}</h1>
          <div className="fs-5 mb-5">
            <span>${data.price}</span>
          </div>
          <p className="lead">{data.description}</p>
          <div className="d-flex">
            <input className="form-control text-center me-3" readOnly id="inputQuantity" type="num" value={count} style={{ maxWidth: '3rem' }} />
            <button className="btn btn-outline-dark flex-shrink-0" onClick={() => addCart(data)} type="button"><i className="bi-cart-fill me-1"></i>Add to cart</button>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default CartDetail