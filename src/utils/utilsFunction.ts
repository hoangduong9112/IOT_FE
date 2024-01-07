import * as _ from "lodash"

export function sumProducts(products) {
  const categoryIDs = []
  products.forEach((product) => {
    categoryIDs.push(product.category_id)
  })
  const uniqCategoryIDs = _.uniq(categoryIDs)
  const sumProducts = []
  uniqCategoryIDs.forEach((categoryID) => {
    const category = products.filter(
      (product) => product.category_id === categoryID,
    )
    sumProducts.push({
      categoryID: categoryID,
      categoryName: category[0].category_name,
      count: category.length,
    })
  })

  return sumProducts
}
