import { NavLink } from 'react-router-dom';
import './product.css';
import textLogo from '../../images/logoNoBG.png'
import { formatMoney } from '../../util/formatting';

export default function Product (props) {
    const { product, setFocusedProduct } = props;

    function showImageDetailsText (event) {
        const parent = event.target.parentNode;
        if (parent.className === 'product-image') {
            parent.childNodes[0].style.filter = 'blur(.2rem)';
            parent.childNodes[1].style.opacity = '1';
        } else if (event.target.className === 'product-image') {
            event.target.childNodes[0].style.filter = 'blur(.2rem)';
            event.target.childNodes[1].style.opacity = '1';
        }
    }

    function unblur (event) {
        const parent = event.target.parentNode;
        if (parent.className === 'product-image') {
            parent.childNodes[0].style.filter = 'none';
            parent.childNodes[1].style.opacity = '0';
        } else if (event.target.className === 'product-image') {
            event.target.childNodes[0].style.filter = 'blur(0rem)';
            event.target.childNodes[1].style.opacity = '0';
        }
    }

    function handleNavigation () {
        setFocusedProduct(product);
    }

    return (
        <div className="product bg-color-salt-slate">
            <NavLink to={`/products/${product.id}`} onClick={handleNavigation} >
                <div className="product-image" onMouseOver={showImageDetailsText} onMouseOut={unblur}>
                    <img src={product.image_url ? product.image_url : textLogo}/>
                    <h2>Click For Product Details</h2>
                </div>
            </NavLink>

            <div className="product-info bg-color-light-slate">
                <NavLink className="product-name" to={`/products/${product.id}`} onClick={handleNavigation} ><p >{product.name}</p></NavLink>
                <p className="product-price">{formatMoney(product.price)}</p>
                <p className="product-stock">{product.stock > 0 ? `${product.stock} Available` : "Out of stock"}</p>
            </div>
        </div>
    )
}