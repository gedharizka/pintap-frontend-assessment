import {
  Container,
  Row,
} from 'reactstrap'
import axios from 'axios'
import React,{useState, useEffect} from 'react'
import CardItem from '../../components/CardItems'
import Select from 'react-select'

export const Home = () => {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])

  const getProduct = async ()=>{
    await axios.get('https://dummyjson.com/products')
    .then((res)=>{
      setProducts(res.data.products)
    })
    .catch((err)=>{
      console.log(err.toJSON())
    })
  }

  const getCategory= async()=>{
    await axios.get('https://dummyjson.com/products/categories')
    .then((res)=>{
     let opt = res.data.map((v)=>({
        label:v,
        value:v
      }))

      setCategory(opt)
    })
    .catch((err)=>{
      console.log('error', err)
    })
  }


  const handleSelect =(e)=>{
    const {value} =e
    axios.get(`https://dummyjson.com/products/category/${value}`)
    .then((res)=>{
      setProducts(res.data.products)
      console.log(res.data)
    })
  }

  useEffect(()=>{
    getProduct()
    getCategory()
  },[])

  return (
    <>
      {/* New Section */}
      <section className='section-home py-5'>
        <Container className='px-4 px-lg-5 mt-5'>
          <Row className='gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-end'>
            <Select options={category} onChange={(e)=>handleSelect(e)}/>
          </Row>
          <br />
          <br />

          <Row className='gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center'>
            {products.map((product)=>(
              <CardItem product={product} key={product.id} />
            ))}
          </Row>
        </Container>
      </section>
    
    </>
  )
}
