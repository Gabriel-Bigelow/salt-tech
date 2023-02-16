import { useEffect, useState } from "react";
import { baseURL } from "../../config"
import { formatMoney } from "../../util/formatting";

import './cart.css';

async function getCartProducts (setCart) {
    const response = await fetch(`${baseURL}/cart`, {
        credentials: 'include'
    });

    if (response.ok) {
        const jsonResponse = await response.json();
        setCart(jsonResponse);
    }
}

function renderCartProducts (products) {
    return products.map(product => {
        return (
            <div className="cart-product bg-color-light-slate" key={product.id}>
                <div className="cart-product-column cart-product-image">
                    <img src={product.image_url}/>
                </div>
                
                <div className="cart-product-column p-baseline">
                    <p>{product.name}</p>
                </div>

                <div className="cart-product-column p-center">
                    <p>{formatMoney(product.price)}</p>
                </div>

                <div className="cart-product-column p-center">
                    <p>{product.quantity}</p>
                </div>
                <div className="cart-product-column p-center">
                    <p>{formatMoney(product.product_total)}</p>
                </div>
                
                
            </div>
        )
    })
}

export default function Cart () {
    const [cart, setCart] = useState({});


    useEffect(() => {
        if (Object.keys(cart).length === 0) {
            getCartProducts(setCart);
        }
    }, [cart]);

    return Object.keys(cart).length > 0 ? (
            <section id="cart">
                <h1 className="color-bg-color-slate">Shopping Cart ({cart.cartTotal.product_types} Product Types)</h1>
                <section id="cart-products" className="bg-color-slate">
                    <div id="cart-product-labels">
                        <div className="cart-product-column cart-product-image ">
                            <p>Preview</p>
                        </div>
                        
                        <div className="cart-product-column p-baseline">
                            <p>Name</p>
                        </div>
                        <div className="cart-product-column p-center">
                            <p>Price</p>
                        </div>
                        <div className="cart-product-column p-center">
                            <p>Qty.</p>
                        </div>
                        <div className="cart-product-column p-center">
                            <p>Total</p>
                        </div>
                    </div>
                    {renderCartProducts(cart.cartProducts)}
                </section>

                <section id="cart-total" className="bg-color-slate">
                    <h2>Cart Total</h2>
                    <div className="cart-totals">
                        <p className="cart-total-labels">Total Price</p>
                        <p>{formatMoney(cart.cartTotal.total_price)}</p>
                    </div>
                    <div className="cart-totals">
                        <p className="cart-total-labels">Items</p>
                        <p>{cart.cartTotal.total_items}</p>
                    </div>
                    <div id="checkout-button">
                        <button className="bg-color-light-slate">Checkout</button>
                    </div>
                </section>
            </section> ) : undefined
}
