import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './account.css';
import { editAddress } from './forms/editAddress';
import { editEmail } from './forms/editEmail';

export default function Account (props) {
    const navigate = useNavigate();
    const { user, setUser } = props;
    const [edit, setEdit] = useState();

    function setEditForm (event) {
        setEdit(event.target.id.slice(5, event.target.id.length - 7));
    }

    function renderEditForm () {
        console.log(edit);
        if (edit === 'address') return editAddress(setEdit, setUser, user);
        if (edit === 'email') return editEmail(setEdit, setUser, user);
    }

    function handleCartNavigate () {
        navigate('/cart');
    }

    function handleOrdersNavigate () {
        navigate('/account/orders')
    }
    
    const address = [];
    if (user && (user.address && user.city && user.state && user.zip && user.country)) {
        address.push(`${user.address},`);
        address.push(`${user.city},`);
        address.push(`${user.state}`);
        address.push(`${user.zip},`);
        address.push(`${user.country}`);
    } else {
        address.push('Address is incomplete. Please provide:');
        const missingItems = [];
        if (!user?.address) missingItems.push('street address');
        if (!user?.city) missingItems.push('city');
        if (!user?.state) missingItems.push('state');
        if (!user?.zip) missingItems.push('zip code');
        if (!user?.country) missingItems.push('country code');
        if (missingItems.length > 1) missingItems.splice(missingItems.length-1, 1, `and ${missingItems[missingItems.length-1]}`)
        missingItems[missingItems.length-1] = missingItems[missingItems.length-1].concat('.');
        address.push(missingItems.join(', '));
    }

    useEffect(() => {
        if (!user) return navigate('/login');
        console.log(user);
    }, [user])
    
    return (
        <section id="account">
            <div id="account-information">
                <h2>Account Information</h2>

                <div id="user-email" className='account-information-block'>
                    <div className='title-and-button-container'>
                        <h3>Email Address</h3>
                        <button id="edit-email-button" className='bg-color-slate' onClick={setEditForm}>Edit</button>
                    </div>
                    <p>{user?.email}</p>
                </div>

                <div id="user-address" className='account-information-block'>
                        <div className='title-and-button-container'>
                            <h3>Address</h3>
                            <button id="edit-address-button" className='bg-color-slate' onClick={setEditForm}>Edit</button>
                        </div>
                        <p>{address.join(' ')}</p>
                </div>
                
                {renderEditForm()}
            </div>

            <div id="account-navigation">
                <h2>Cart and Orders</h2>
                <button onClick={handleCartNavigate}>Cart</button>
                <button onClick={handleOrdersNavigate}>Order History</button>
            </div>
        </section>
    )
}