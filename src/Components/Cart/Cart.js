import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { baseURL } from "../../config"
import { formatMoney } from "../../util/formatting";
import { quantityOptions } from "../../util/selectBuilder";

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

async function updateCart (productId, quantity) {
    const response = await fetch(`${baseURL}/products/${productId}/addToCart`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'post',
        body: JSON.stringify({
            quantity: quantity
        }),
        credentials: 'include'
    })

    if (response.ok) return true;
    return false;
}

async function removeProductFromCart (productId) {
    const response = await fetch(`${baseURL}/cart/removeProductFromCart/${productId}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'delete',
        credentials: 'include'
    })

    if (response.ok) return true;
    return false;
}

function renderCartProducts (products, handleChange, handleClick) {
    return products.map(product => {
        return (
            <div className="cart-product bg-color-light-slate" key={`cart-product-${product.product_id}`}>
                <div className="cart-product-column cart-product-image">
                    <img src={product.image_url} alt={product.name}/>
                </div>
                
                <div className="cart-product-column p-baseline">
                    <NavLink to={`/products/${product.product_id}`}><p>{product.name}</p></NavLink>
                </div>

                <div className="cart-product-column p-center">
                    <p>{formatMoney(product.price)}</p>
                </div>

                <div className="cart-product-column p-center">
                    <select id={`select-element-for-product-${product.product_id}`} onChange={handleChange} defaultValue={product.quantity}>
                        {quantityOptions(product) }
                    </select>
                </div>
                <div className="cart-product-column p-center">
                    <p>{formatMoney(product.product_total)}</p>
                </div>
                <button id={`remove-product-${product.product_id}`} className="remove-product bg-color-light-slate" onClick={handleClick}>Remove</button>
            </div>
        )
    })
}

export default function Cart (props) {
    const { user } = props;
    const [cart, setCart] = useState({});
    const navigate = useNavigate();

    async function handleChange (event) {
        const productId = parseInt(event.target.id.replace('select-element-for-product-', ''));
        const quantity = parseInt(event.target.value);
        setCart({cartProducts: 'Updating cart'});

        if (quantity !== 0) { 
            const cartUpdated = await updateCart(productId, quantity);
            if (cartUpdated) {
                getCartProducts(setCart);
            }
        } else {
            const productRemoved = await removeProductFromCart(productId);
            if (productRemoved) {
                getCartProducts(setCart);
            }
        }
    }

    async function handleClick (event) {
        const productId = event.target.id.replace('remove-product-', '');
        setCart({cartProducts: 'Updating cart'});

        const productRemoved = await removeProductFromCart(productId);
        if (productRemoved) {
            getCartProducts(setCart);
        }
    }

    async function handleCheckout () {
        const response = await fetch(`${baseURL}/cart/checkout`, {
            method: 'post',
            credentials: "include",
        });

        if (response.ok) {
            navigate('/account/orders');
        }
    }

    useEffect(() => {
        if (!user) return navigate('/login');
        if (Object.keys(cart).length === 0) {
            getCartProducts(setCart);
        }
    }, [cart, user, navigate]);

    return Object.keys(cart).length === 2 ? (
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
                    {renderCartProducts(cart.cartProducts, handleChange, handleClick)}
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
                        <button className="bg-color-light-slate" onClick={handleCheckout}>Checkout</button>
                    </div>
                </section>
            </section> ) : Object.keys(cart).length === 0 ? (
                <section id="cart"><h2>Loading Cart</h2></section>
                ) : (
                <section id="cart">
                    <h2>{cart.cartProducts}</h2>
                </section>
            )
            
}
