const prapareProduct = (product) => {
    const price = product.price;
    const discount = product.discount;

    let sellingPrice = null
    let saving = null
    let isDiscountAvalable = false

    if(discount || discount > 0 ){
         sellingPrice = price * (1 - discount)
         saving = price * discount
         isDiscountAvalable = true
    }

    product.sellingPrice = sellingPrice
    product.saving = saving
    product.isDiscountAvalable = isDiscountAvalable

    console.log(product)

    return product

}

export default prapareProduct