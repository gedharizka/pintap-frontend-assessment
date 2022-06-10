import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { Col, Container, Row, Card, CardBody, Button, InputGroup, Input } from 'reactstrap'

const CartPage = (props) => {

  const {setCountCart} = props

  const [itemCart, setItemCart] = useState([])

  const getCart = async()=>{
    await axios.get('https://dummyjson.com/carts/user/5')
    .then((res)=>{
      // console.log(res.data.carts)
      let tmp = res.data.carts.map((v)=>({
        products:v.products,
        total:v.total,
        totalProduct:v.totalProducts,
        totalQuantity:v.totalQuantity
      }))

      tmp.forEach((i)=>{
        setItemCart(i.products)
        setCountCart(i.totalQuantity)    
      })

      
    })
    .catch((err)=>{
      console.log('error', err)
    })
  }

  
  const addItem =(data)=>{
    let product = []

    console.log('sukses',data)
    const exist = itemCart.find(x => x.id === data.id)
    
    if (exist){
      
      product.push({id:data.id, quantity: data.quantity + 1})

      axios.post(`https://dummyjson.com/carts/add`, {
        userId:5,
        products:product
      })
      .then((res)=>{
        let tmp = res.data.products.map((v)=>({
          total:v.total,
          quantity:v.quantity
        }))

        let total 
        
        tmp.forEach((i)=>{
          total=i.total
        })
        
        setItemCart(itemCart.map((x)=> x.id === data.id ? 
        {...exist,
          quantity:exist.quantity + 1,
          total:total
        } : x))
  
      })
      .catch((err)=>{
        console.log(err)
      })
    }else {
      return
    }
  }

  const removeItem =(data)=>{
    let exist = itemCart.find(x => x.id === data.id)

    if (exist.quantity === 1){
      setItemCart(itemCart.filter((x) => x.id !== data.id))
    }else {
      setItemCart(itemCart.map((x)=> x.id === data.id ? {...exist, quantity:exist.quantity -1,total:exist.quantity * exist.price} : x))
    }
  }
  
  useEffect(()=>{
    getCart()
  }, [])

  const totalPrice = itemCart.reduce((a,c) => a+c.price * c.quantity,0)

  return (
    <>
      <section>
        <Container>
          <Row className="d-flex justify-content-center">
            <Col md="8">
              {/* New Layout */}
              <br />
              <br />

              <Card>
                <CardBody>
                  <Row>
                    <div className="col-md-12 order-md-2 mb-4">
                      <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Your cart</span>
                        <span className="badge badge-secondary badge-pill">
                          3
                        </span>
                      </h4>
                      
                      <ul className="list-group mb-3">
                        {/* <Col md={1}><img src="https://i.imgur.com/qqBRWD5.jpg" alt="" width={32} height={32}/></Col> */}
                        {itemCart.map((data) => (
                          <li key={data.id} className="list-group-item d-flex justify-content-between lh-condensed">
                              <Col md={6}>
                                <h6 className="my-0">{data.title}</h6>
                                <span className="text-muted">${data.price}</span>
                              </Col>
                              <Col md={2} className="text-center align-items-center" >
                                <InputGroup>
                                  <Button color="danger" size="sm" onClick={()=>removeItem(data)}>-</Button>
                                  <Input className="text-center" value={data.quantity} readOnly bsSize="sm" />
                                  <Button color="success" size="sm" onClick={()=>addItem(data)}>+</Button>
                                </InputGroup>
                              </Col>
                              <Col md={3} className="text-end">
                                <span>
                                  <strong>${data.total}</strong>
                                </span>
                              </Col>
                            </li>

                        ))}

                          <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>${totalPrice}</strong>
                          </li>
                      </ul>

                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default CartPage