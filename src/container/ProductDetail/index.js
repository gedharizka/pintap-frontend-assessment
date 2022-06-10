import React, { useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {
  Container,
} from 'reactstrap'
import CartDetail from '../../components/CartDetail'

const ProductDetail = (props) => {

  const params = useParams()
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)

  const getDetail =async()=>{
    await axios.get(`https://dummyjson.com/products/${params.id}`)
    .then((res)=>{  
      setData(res.data)
    })
    .catch((err)=>{
      console.log(err.toJSON())
    })
  }

  const addCart =(data)=>{
    let product = []

    product.push({id:data.id, quantity: count})
  
    axios.post(`https://dummyjson.com/carts/add`, {
      userId:5,
      products:product
    })
    .then((res)=>{
      props.setCountCart(prev => prev + 1)
    })
    .catch((err)=>{
      console.log(err)
    })

    setCount(prev => prev + 1)
  }

  useState(()=>{
    getDetail()
  }, [])


  
  return (
    <>
      {/* New Section */}
      <section className='mt-5 py-5'>
        <Container>
          <CartDetail data={data}  addCart={addCart} count={count} />
          {/* <Row>
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
                  <input className="form-control text-center me-3" readOnly id="inputQuantity" type="num" value={count} style={{maxWidth:'3rem'}} />
                  <button className="btn btn-outline-dark flex-shrink-0" onClick={()=>addCart(data)} type="button"><i className="bi-cart-fill me-1"></i>Add to cart</button>
              </div>
            </Col>
          </Row> */}
        </Container>
      </section>
    </>
  )
}

export default ProductDetail