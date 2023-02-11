import { useEffect, useState } from "react"
import { baseURL } from "../../config";
import Product from "./Product";

import './products.css';

async function fetchProducts (setProducts) {
    const response = await fetch(`${baseURL}/products`);

    if (response.ok) {
        const jsonResponse = await response.json();
        setProducts(jsonResponse);
    }
}



export default function Products (props) {
    const { setFocusedProduct } = props;
    const [products, setProducts] = useState();

    useEffect(() => {
        fetchProducts(setProducts);
    }, [])


    console.log(products);


    return (
        <section id="products">
            <h2>Products</h2>
            <div className="products-list">
                {products ? products.map(product => {
                    return <Product key={product.id} product={product} setFocusedProduct={setFocusedProduct} />             
                }) : null}
            </div>
        </section>
    )
}