import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { emptyCart, removeFromCart } from '../redux/slices/cartSlice'

function Cart() {
  const cartArray = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()

const [total,setTotal]=useState(0)
const navigate = useNavigate()
  const getCartTotal =()=>{
    if(cartArray.length>0){
      setTotal(cartArray.map(item=>item.price).reduce((p1,p2)=>p1+p2))
  
    }else{
      setTotal(0)
    }
  }
  useEffect(()=>{
    getCartTotal()
  },[cartArray])
  
 const handleCart=()=>{
   dispatch(emptyCart())
   alert("Order Placed Successfully,Thank you for purchasing ")
   navigate('/')
 }


  return (
    <div className='container' style={{marginTop:'100px'}}>
      {
        cartArray.length>0?
        <div className='row mt-5'>
          <div className="col-lg-8">
           
          <table className='table shadow border'>
        <thead>
          <tr>
            <th>#</th>
            <th>product</th>
            <th>product image</th>
            <th>price</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {
            cartArray.map((product,index)=>(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{product.title}</td>
                <td><img width={'100px'} height={'100px'} src={product.thumbnail} alt="" /></td>
                <td>{product.price}</td>
                <td><button onClick={()=>dispatch(removeFromCart(product.id))} className='btn'><i className='fa-solid fa-trash text-danger '></i></button></td>
              </tr>
            ))
          }
        </tbody>
        
          </table>
            
          </div>

          <div className="col-lg-1"></div>
          <div className="col-lg-3">
            <div className='border mt-3 rounded shadow p-2 w-100'>
              <h2 className='text-primary'>Cart Summary</h2>
              <h4 >Total Products :<span >{cartArray.length}</span> </h4>
              <h4 className='mt-3'>Total: <span className='text-danger fw-bolder fs-2'>$ {total}</span></h4>
              <div className="d-grid">
                <button onClick={handleCart} className='btn btn-success mt-5 rounded'>Check Out</button>
              </div>

            </div>
          </div>

        </div>:<div style={{height:'100vh' }} className='w-100 d-flex flex-column jusify-content-center align-items-center'>
          <img height={'500px'} width={'500px'} src="https://supershopping.lk/images/home/Cart-empty.gif" alt="" />
          <h3 className='text-center text-danger'>Cart Is Empty!!</h3>
          <Link style={{textDecoration:'none'}}className='btn btn-warning rounded' to={'/'}>Back to Home</Link>
        </div>
      }
    </div>
  )
}

export default Cart