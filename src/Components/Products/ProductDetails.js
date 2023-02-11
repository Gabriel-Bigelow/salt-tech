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

function renderProduct (product) {
    if (product) {

        console.log(product.image_url);
        return (
            <div>
                <p>{product ? product.name : null}</p>
                <img src={product.image_url}></img>
            </div>
        )
    }
}

export default function ProductDetails (props) {
    let { focusedProduct } = props;
    const [product, setProduct] = useState();
    const { productId } = useParams();


    useEffect(() => {
        if (!focusedProduct) {
            getProductById(productId, setProduct);
        } else {
            setProduct(focusedProduct);
        }
    }, [focusedProduct, productId]);



    return (
        <div>
            <p>Product Details page</p>
            {renderProduct(product)}
            
        </div>

    )
}