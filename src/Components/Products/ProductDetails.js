import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../config";


async function getProductById (productId, setProduct) {
    const response = await fetch(`${baseURL}/products/${productId}`);

    if (response.ok) {
        const jsonResponse = await response.json();
        setProduct(jsonResponse);
    }
}

function renderProduct (product, addToCart) {
    if (product) {
        return (
            <div>
                <p>{product ? product.name : null}</p>
                <img src={product.image_url}></img>
                <button onClick={addToCart}>Add To Cart</button>
            </div>
        )
    }
}




export default function ProductDetails (props) {
    let { focusedProduct } = props;
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState();
    const { productId } = useParams();


    useEffect(() => {
        if (!focusedProduct) {
            getProductById(productId, setProduct);
        } else {
            setProduct(focusedProduct);
        }
    }, [focusedProduct, productId]);

    async function addToCart () {
        const response = await fetch(`${baseURL}/products/${product.id}/addToCart`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'post',
            body: JSON.stringify({
                quantity: "2"
            }),
            credentials: 'include'
        })

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        }
    }

    return (
        <div>
            <p>Product Details page</p>
            {renderProduct(product, addToCart)}
            
        </div>

    )
}