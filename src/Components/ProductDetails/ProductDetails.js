import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../../config";
import { formatMoney } from "../../util/formatting";
import { quantityOptions } from "../../util/selectBuilder";

import './productDetails.css';


async function getProductById (productId, setProduct, setFocusedProduct) {
    const response = await fetch(`${baseURL}/products/${productId}`);

    if (response.ok) {
        const jsonResponse = await response.json();
        setProduct(jsonResponse);
        setFocusedProduct(jsonResponse);
    }
}

function renderProduct (product, addToCart, handleChange, quantity) {
    if (product) {
        return (
            <section id="pd-product">
                <div id="pd-image">
                    <img src={product.image_url} alt={product.name} />
                </div>
                
                <section id="pd-text-short">
                    <div id="pd-title-bar">
                        <h2 className="color-slate">{product ? product.name : null}</h2>
                        <h2 className="color-slate">{product ? formatMoney(product.price) : null}</h2>
                    </div>
                    <p>Description about the product will go here
                        and describe the product and may be entice the user
                        to buy the product. If it is longer, than the description should
                        go in the description log section. Just to make sure that we have
                        a long enough example description, I will keep typing until I 
                        believe we have reached a length that will suffice.
                    </p>

                    {product.stock > 0 ? (
                        <section id="pd-actions" onChange={handleChange}>
                            <p className="color-sea-salt">In Stock</p>
                            <div>
                                <select defaultValue={1}>
                                    {quantityOptions(product)}
                                </select>
                                <button onClick={addToCart}>Add To Cart</button>
                            </div>
                        </section>) : 
                    (
                        <section id="pd-actions">
                            <p className="color-light-slate">Out Of Stock</p>
                        </section>
                    )}
                </section>
            </section>
        )
    }
}




export default function ProductDetails (props) {
    let { focusedProduct, setFocusedProduct } = props;
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const { productId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (!focusedProduct) {
            getProductById(productId, setProduct, setFocusedProduct);
        } else {
            setProduct(focusedProduct);
        }
    }, [focusedProduct, productId, setFocusedProduct]);

    async function addToCart () {
        const response = await fetch(`${baseURL}/products/${product.id}/addToCart`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'post',
            body: JSON.stringify({
                quantity: quantity
            }),
            credentials: 'include'
        })

        if (response.ok) {
            navigate('/cart');
        }
    }

    function handleChange (event) {
        setQuantity(event.target.value)
    }
    
    return (
        <div id="pd-container">
            {renderProduct(product, addToCart, handleChange)}
        </div>

    )
}