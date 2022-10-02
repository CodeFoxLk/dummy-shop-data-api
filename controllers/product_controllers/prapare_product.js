const prapareProduct = (product) => {
  if (!product) {
    return {}
  }

  const price = product.price
  const discount = product.discount

  let sellingPrice = null
  let saving = null
  let isDiscountAvalable = false

  if (discount || discount > 0) {
    sellingPrice = price * (1 - discount)
    saving = price * discount
    isDiscountAvalable = true
  }

  // add custom new fields to product model
  product.sellingPrice = sellingPrice
  product.saving = saving
  product.isDiscountAvalable = isDiscountAvalable

  return product
}

export default prapareProduct
