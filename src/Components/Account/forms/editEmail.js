import { baseURL } from "../../../config";


export function editEmail (setEdit, setUser, user) {

    async function handleSubmit (event) {
        event.preventDefault();
        const values = {
            email: document.getElementById('email-input').value,
        };

        const checkForEmailInUse = await fetch(`${baseURL}/users/userByEmail/${values.email}`, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        
        if (checkForEmailInUse.ok) {
            const jsonEmail = await checkForEmailInUse.json();
            
            if (!jsonEmail) {
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
        }
    }

    function handleClose () {
        setEdit(false);
    }

    return (
        <div className='edit-form-container'>
            <div className='bg-color-slate'>
                <button id="close" onClick={handleClose}>X</button>
                <h2>Edit Email</h2>
                <form className="edit-account-form" onSubmit={handleSubmit}>
                    <label>Email Address</label>
                    <input type="email" id="email-input" placeholder='ex: john.smith@gmail.com' defaultValue={user.email} required/>
                    <input type="submit" id='edit-address-submit' className='bg-color-slate' />
                </form>
            </div>
        </div>
    )
}