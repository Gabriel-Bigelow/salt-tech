import { baseURL } from '../../config';
import './account.css';

async function handleAddressSubmit (event) {
    event.preventDefault();

    const values = {}

    values.address = document.getElementById('street-address-input').value;
    values.city = document.getElementById('city-input').value;
    values.state = document.getElementById('state-input').value;
    values.zip = document.getElementById('zip-input').value;
    values.country = document.getElementById('country-input').value;
    
    const jsonString = JSON.stringify(values);
    console.log(jsonString);

    const response = await fetch(`${baseURL}/users/updateUser`, {
        method: "put",
        body: jsonString,
        credentials:'include'
    })

    if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
    }
}

function renderEditAddress () {
    return (
        <div className='edit-form-container'>
            <div className='bg-color-slate'>
                <h2>Edit Address</h2>
                <form className="edit-account-form" onSubmit={handleAddressSubmit}>
                    <label>Street Address</label>
                    <input type="text" id="street-address-input" placeholder='ex: 123 Apple Street' />
                    <label>City</label>
                    <input type="text" id="city-input" placeholder='ex: Los Angeles'/>
                    <label>State</label>
                    <input type="text" id="state-input" placeholder='ex: CA' maxLength={2}/>
                    <label>Zip/Postal Code</label>
                    <input type="text" id="zip-input" placeholder='ex: 90210' maxLength={5}/>
                    <label>Country Code</label>
                    <input type="text" id="country-input" placeholder='ex: USA' maxLength={3}/>
                    <input type="submit" id='edit-address-submit' className='bg-color-slate' />
                </form>
            </div>
        </div>
    )
}

export default function Account (props) {
    const { user } = props;
    const smallAddress = [];
    const bigAddress = [];
    if (user.address && user.city && user.state && user.zip && user.country) {
        smallAddress.push(user.address);
        bigAddress.push(user.city);
        bigAddress.push(user.state);
        bigAddress.push(user.zip);
        bigAddress.push(user.country);
    } else {
        bigAddress.push('Address is incomplete');
    }

    return (
        <section id="account">
            <div id="account-information">
                <h2>Account Information</h2>

                <div id="user-email" className='account-information-block'>
                    <ul>
                        <div className='title-and-button-container'>
                            <h3>Email Address</h3>
                            <button className='bg-color-slate'>Edit</button>
                        </div>
                        <li>{user.email}</li>
                    </ul>
                </div>

                <div id="user-address" className='account-information-block'>
                    <ul>
                        <div className='title-and-button-container'>
                            <h3>Address</h3>
                            <button className='bg-color-slate'>Edit</button>
                        </div>
                        <li>{user.address && bigAddress.length > 1 ? `${smallAddress[0]},` : 'Address is incomplete'}</li>
                        {bigAddress.length > 1 ? <li>bigAddress.join(', ')</li> : undefined}
                    </ul>
                </div>
                {renderEditAddress()}

                
            </div>
        </section>
    )
}