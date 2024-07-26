import { useState, useEffect } from 'react';
import ProductsCatalogCards from './ProductsCatalogCards';
import HotProducts from '../pages/HotProducts';

export default function UserView({productsData}) {
    const [products, setProducts] = useState([])

    useEffect(() => {

        const productsArr = productsData.map(product => {
            //only render the active products
            if(product.isActive === true) {
                return (
                    <ProductsCatalogCards productProp={product} key={product._id}/>
                    )
            } else {
                return null;
            }
        })

        //set the products state to the result of our map function, to bring our returned product component outside of the scope of our useEffect where our return statement below can see.
        setProducts(productsArr)

    }, [productsData])

    return(
        <div className='p-5'>
            <HotProducts/>
            <h1 className='text-uppercase fw-bold color-secondary'>Our Products</h1> 
            <div className='d-flex flex-wrap justify-content-evenly my-5 gap-4'> 
                {products}
            </div>
        </div>
    )
}