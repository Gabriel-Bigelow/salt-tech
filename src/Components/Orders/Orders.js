import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { baseURL } from '../../config';
import { formatMoney } from '../../util/formatting';
import './orders.css'

import Order from '../Order/Order';

async function getOrders (setOrders) {
    const response = await fetch (`${baseURL}/orders`, {
        credentials: 'include'
    });

    if (response.ok) {
        const jsonResponse = await response.json();
        const ordersData = [];
        Object.keys(jsonResponse).forEach(order => ordersData.push(jsonResponse[order]));
        setOrders(ordersData);
    }
}

export default function Orders () {
    const [orders, setOrders] = useState();
    
    console.log(orders);

    useEffect(() => {
        getOrders(setOrders)
    }, [])

    return (
        <section id="orders">
            <h2>Orders</h2>
            <div id="orders-list" className='bg-color-slate'>
                {orders ? orders.map(order => <Order order={order} key={order.id}/>) : undefined}
            </div>
        </section>
    )
}