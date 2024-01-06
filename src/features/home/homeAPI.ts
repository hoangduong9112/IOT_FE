// Generate Order Data
function createData(id: number, name: string, count: number) {
  return { id, name, count }
}

const products = [
  createData(1, "IPhone 13 Pro Max", 59),
  createData(2, "IPhone 13 Pro", 59),
  createData(3, "IPhone 15 Pro Max", 59),
  createData(4, "IPhone 12 Pro Max", 59),
  createData(5, "IPhone 11", 59),
  createData(6, "IPhone 15", 59),
  createData(7, "IPhone 14", 59),
]

export function getProducts() {
  return { data: products }
}
