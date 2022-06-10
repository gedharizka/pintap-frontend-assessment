import React from 'react'
import {
  Col,
  Card,
  Button
} from 'reactstrap'
import {Link} from 'react-router-dom'

const CardItem = (props) => {
  const {product}=props
  return (
    <Col className="mb-5">
      <Card className="h-100 shadow-sm">
        <div className='section-img'>
          <div className="badge bg-dark text-white position-absolute" style={{ top: "0.5rem", right: "0.5rem" }} >
            {product.category}
          </div>
          <img className="card-img-top" src={product.thumbnail} alt="..." />
        </div>
        <div className="card-body p-4">
          <div className="title-product text-center">
            <h5 className="title-price fw-bolder">{product.title}</h5>${product.price}
          </div>
          <p>{product.description}</p>
        </div>

        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <Link to={`detail/${product.id}`}>
              <Button outline className="mt-auto">View Detail</Button>
            </Link>
          </div>
        </div>
      </Card>
    </Col>
  );
}

export default CardItem