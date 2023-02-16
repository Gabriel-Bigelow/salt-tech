export function quantityOptions (product) {
    const { stock, quantity } = product;
    const quantities = [];

    let incrementor = 1;
    let i = 0;
    
    if (stock > 100) { 
        incrementor = 10
    };
    if (stock > 1000) {
        incrementor = 100;
    };

    for (i; i <= stock; i += incrementor) {
        if (quantity && quantity === i) {
            quantities.push(<option key={i} value={`${i}`} selected>{i}</option>);
        } else if (!quantity && i === 1){
            quantities.push(<option key={i} value={`${i}`} selected>{i}</option>);
        } else {
            quantities.push(<option key={i} value={`${i}`}>{i}</option>);
        }
    }
    return quantities;
}