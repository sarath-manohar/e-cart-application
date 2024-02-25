import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromWhishlist } from '../redux/slices/whishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'

function Whishlist() {

  const whishlistArray = useSelector((state)=>state.wishlistReducer)
  const dispatch = useDispatch()
  const handleWhishlistCart = (product)=>{
    dispatch(addToCart(product))
    dispatch(removeFromWhishlist(product.id))
  }
  return (
    <div style={{marginTop:'100px'}}>
    <Row>
      {
        whishlistArray.length>0?
        whishlistArray.map((product,index)=>(
          <Col key={index} className='mb-5' sm={12} md={6} lg={4} xl={3}>
          <Card className='shadow rounded' style={{ width: '19rem',height:'30rem' }}>
               <Card.Img height={"200px"} variant="top" src={product?.thumbnail} />
               <Card.Body>
                 <Card.Title>{product?.title}</Card.Title>
                 <Card.Text>
                  <p>{product?.description.slice(0,55)}...</p>
                  <h5>${product?.price}</h5>
                 </Card.Text>
                 <div className='d-flex justify-content-between'>
                 <Button onClick={()=>dispatch(removeFromWhishlist(product.id))} className='btn btn-light' ><i className='fa-solid fa-trash text-danger '></i></Button>
                 <Button className='btn btn-light' onClick={()=>handleWhishlistCart(product)}><i className='fa-solid fa-cart-shopping text-warning '></i></Button>
                 </div>
               </Card.Body>
             </Card>
          </Col>
        )):<div style={{height:'100vh' }} className='w-100 d-flex flex-column jusify-content-center align-items-center'>
          <img height={'500px'} width={'500px'} src="https://supershopping.lk/images/home/Cart-empty.gif" alt="" />
          <h3 className='text-center text-danger'>Whishlist Is Empty!!</h3>
          <Link style={{textDecoration:'none'}}className='btn btn-warning rounded' to={'/'}>Back to Home</Link>
        </div>
}
    </Row>
    </div>
  )
}

export default Whishlist