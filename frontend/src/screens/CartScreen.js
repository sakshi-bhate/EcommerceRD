import React,{useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {Row,Col,ListGroup,Image,Form,Button,Card, ListGroupItem} from 'react-bootstrap'
import {addToCart,removeFromCart} from '../actions/cartAction'
const CartScreen=({location,history ,match})=>{
    const productId=match.params.id
    const qty=location.search ? Number(location.search.split('=')[1]):1
    const dispatch=useDispatch()

    const cart=useSelector(state=>state.cart)
    const {cartItems}=cart
    

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty))
        }

    },[dispatch,productId,qty])

    const RemoveHandler=(id)=>{
        dispatch(removeFromCart(id))
    }

    return (
        <Row>
            <Col md={8}>
                {cartItems.length === 0 ? (<h2>your cart is empty</h2> ):(
                    <ListGroup variant='flush'>
                        {cartItems.map(item=>(
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={3}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={3}>
                                    <Form.Control as ="select" value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))
                                                }
                                            </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button type='button' variant='light' onClick={()=>RemoveHandler(item.product)}>
                                                Remove Item
                                        </Button>
                                    </Col>
                                </Row>


                            </ListGroup.Item>
                        ))}

                    </ListGroup>
                )
                
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Total Items:({cartItems.reduce((acc,item)=>acc+item.qty,0)})</h2>
                            ${cartItems.reduce((acc,item)=>acc+(item.price*item.qty),0)}
                        </ListGroup.Item>
                        
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
