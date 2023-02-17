export function quantityOptions (product) {
    const { stock } = product;
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
        quantities.push(<option key={i} value={`${i}`}>{i}</option>);
    }
    return quantities;
}