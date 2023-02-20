import { baseURL } from "../../../config";

export function editAddress (setEdit, setUser, user) {
    async function handleSubmit (event) {
        event.preventDefault();
        const values = {
            address: document.getElementById('street-address-input').value,
            city: document.getElementById('city-input').value,
            state: document.getElementById('state-input').value.toUpperCase(),
            zip: document.getElementById('zip-input').value,
            country: document.getElementById('country-input').value.toUpperCase()
        };
    
        const response = await fetch(`${baseURL}/users/updateUser`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "put",
            body: JSON.stringify(values),
            credentials:'include'
        })
    
        if (response.ok) {
            const jsonResponse = await response.json();
            setUser(jsonResponse);
            setEdit(false);
        }
    }

    function handleClose () {
        setEdit(false);
    }

    return (
        <div className='edit-form-container'>
            <div className='bg-color-slate'>
                <button id="close" onClick={handleClose}>X</button>
                <h2>Edit Address</h2>
                <form className="edit-account-form" onSubmit={handleSubmit}>
                    <label>Street Address</label>
                    <input type="text" id="street-address-input" placeholder='ex: 123 Apple Street' defaultValue={user.address} required/>
                    <label>City</label>
                    <input type="text" id="city-input" placeholder='ex: Los Angeles' defaultValue={user.city} required/>
                    <label>State</label>
                    <input type="text" id="state-input" placeholder='ex: CA' maxLength={2} defaultValue={user.state} required/>
                    <label>Zip / Postal Code</label>
                    <input type="text" id="zip-input" placeholder='ex: 90210' maxLength={5} defaultValue={user.zip} required/>
                    <label>Country Code</label>
                    <input type="text" id="country-input" placeholder='ex: USA' maxLength={3} defaultValue={user.country} required/>
                    <input type="submit" id='edit-address-submit' className='bg-color-slate' />
                </form>
            </div>
        </div>
    )
};