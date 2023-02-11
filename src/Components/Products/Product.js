import './product.css';


export default function Product (props) {
    const { product } = props;

    console.log(product);


    return (
        <div class="product">
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.stock}</p>
        </div>
    )
}