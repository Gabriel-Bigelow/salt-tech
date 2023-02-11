import { useEffect, useState } from "react"
import { baseURL } from "../../config";
import Product from "./Product";

async function fetchProducts (setProducts) {
    const response = await fetch(`${baseURL}/products`);

    if (response.ok) {
        const jsonResponse = await response.json();
        setProducts(jsonResponse);
    }
}



export default function Products () {
    const [products, setProducts] = useState();

    useEffect(() => {
        fetchProducts(setProducts);
    }, [])


    console.log(products);


    return (
        <section>
            {products ? products.map(product => {
                return <Product key={product.id} product={product} />             
            }) : undefined}
            
        </section>
    )
}