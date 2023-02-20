import { formatMoney } from "../../util/formatting"

import './order.css';

export default function Order (props) {
    const { order } = props

    return (
        <div className="order" key={`order-${order.id}`}>
            <div className='order-overview bg-color-light-slate'>
                <div className='order-overview-details'>
                    <div className='order-overview-column'>
                        <p className="order-label">Product Types</p>
                        <p>{order.unique_products}</p>
                    </div>
                    
                    <div className='order-overview-column'>
                        <p className="order-label">Items</p>
                        <p>{order.total_items}</p>
                    </div>
                    

                </div>

                <div className='order-number-and-actions'>


                    <div className='order-overview-column'>
                        <p className="order-label">Order #{order.id}</p>
                        {/* Add in link to order details page <NavLink>View Order Details</NavLink> */}
                    </div>


                </div>
            </div>


            <div className="order-product-labels bg-color-light-slate">
                <p className="order-label">Preview</p>
                <p className="order-label">Name</p>
                <p className="order-label">Price</p>
                <p className="order-label">Qty.</p>
                <p className="order-label">Total</p>
            </div>

            {order.products.map(product => (<div className="order-products bg-color-light-slate" key={`order-${order.id}-product-${product.id}`}>
                <div className="order-product-column order-product-image">
                    <img src={product.image_url} alt={product.name}/>
                </div>
                
                <div className="order-product-column">
                    <p>{product.name}</p>
                </div>

                <div className="order-product-column">
                    <p>{formatMoney(product.price)}</p>
                </div>

                <div>
                    <p>{product.quantity}</p>
                </div>

                <div className="order-product-column">
                    <p>{formatMoney(product.total)}</p>
                </div>
            </div>))}
        </div>
    )
}