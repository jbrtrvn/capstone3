import React from 'react'
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from '../UserContext';
import { Card, Button } from 'react-bootstrap'; 
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductsView = () => {

    const { productId } = useParams();
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    const [quantity, setQuantity] = useState(1);

    useEffect(() =>{
        fetch(`${import.meta.env.VITE_API_URL}/products/` + productId, {
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data =>{
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
        })
    },[productId]) 

    const addQuantity = () => {
        setQuantity(prevState => prevState + 1);
    }

    const minusQuantity = () => {
        if(quantity > 1){
            setQuantity(prevState => prevState - 1); 
        }
    }

    const handleAddToCart = () =>{
        fetch(`${import.meta.env.VITE_API_URL}/cart/add-to-cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                productId: productId,
                quantity: quantity
            })
        })
        .then(res => res.json())
        .then(data => {
            
            if (data.message === "Added to cart successfully") {
                Swal.fire({
                    title: "Item Added to Cart Successfully",
                    icon: "success",
                    text: `Total items in cart ${quantity}`
                });
                navigate('/products');
            } else {
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "Failed to add item to cart. Please try again."
                });
            }
        })
    }

  return (
    (user.id === null && user.id === undefined) 
    ? <Navigate to='/login'/> 
    : <div className='p-5'>
        <div className="py-3">
            <Button variant="dark" as={Link} to="/products">
                <FaArrowLeft />
            </Button>
        </div>
        <Card >
            <Card.Header className='fs-2 text-center bg-dark text-white'>{name}</Card.Header>
            <Card.Body className=' text-center'>
                <Card.Title className='fs-3'>{description}</Card.Title>
                <Card.Text className='fs-4 fw-semibold'>Price: 
                    <span className='text-danger'> &#8369;{price}</span>
                </Card.Text>
                <Card.Text className='fs-4 fw-semibold'>Quantity:</Card.Text>
                <div className=' d-flex justify-content-center gap-4'>
                    <Button variant='dark' onClick={() => minusQuantity()}>
                        <FaMinus/>
                    </Button>
                    <p className='text-center m-0'>{quantity}</p>
                    <Button variant='dark' onClick={() => addQuantity()}>
                        <FaPlus/>
                    </Button>
                </div>
                <Button variant="primary my-3 px-4 py-2" 
                onClick={handleAddToCart}>Add to Cart</Button>
            </Card.Body>
        </Card> 
    </div>
  )
}

export default ProductsView
