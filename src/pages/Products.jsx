import { useState, useEffect, useContext } from 'react';
import AdminView from '../components/AdminView';
// import ProductsCatalogCards from '../components/ProductsCatalogCards'
import UserView from '../components/UserView';
import CartView from './CartView';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import OrderHistoryView from '../components/OrderHistoryView';


import UserContext from '../UserContext';

export default function Products() {

    const {user} = useContext(UserContext);

    const [products, setProducts] = useState([]);


    const fetchData = () => {
        let fetchUrl = user.isAdmin === true ? `${import.meta.env.VITE_API_URL}/products/all` : `${import.meta.env.VITE_API_URL}/products`;
    
        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.message === "No products found") {
                console.log(data.message);
                setProducts([]);
            } else {
                setProducts(data.products); 
            }
        })
    };

    useEffect(() => {

    	fetchData();

    }, [user]);

    return (
        <div style={{ position: 'relative' }}>
            {user.isAdmin ? (
                <AdminView productsData={products} fetchData={fetchData} />
            ) : (
                <>
                <UserView productsData={products} />
                <Link to="/get-cart" style={{ position: 'absolute', top: '20px', right: '40px', zIndex: '100' }}>
                    <Button variant="success">View Cart</Button>
                </Link>
                <Link to="/my-orders" style={{ position: 'absolute', top: '20px', left: '850px', zIndex: '100' }}>
                    <Button variant="warning">Order History</Button>
                </Link>
                </>
            )}
        </div>
    );
}