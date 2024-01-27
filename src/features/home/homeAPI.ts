import axiosClient from "../../services/axios"

export async function getProducts() {
  const url = "/cards/display"
  return await axiosClient.get(url)
}

export function addProducts(data) {
  const url = "/cards/register"
  console.log("data", data)
  return axiosClient.post(url, data)
}

export function exportProducts(data) {
  const url = "/cards/export"
  console.log("data", data)
  return axiosClient.put(url, { product_ids: data.product_ids })
}
