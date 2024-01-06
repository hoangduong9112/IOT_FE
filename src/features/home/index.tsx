import * as React from "react"
import { Box } from "@mui/material"
import { Header } from "../../components/header"
import ProductList from "../../components/productList"

const Home = () => {
  return (
    <Box>
      <Box>
        <Header />
      </Box>
      <Box
        style={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px" }}
      >
        <ProductList />
      </Box>
    </Box>
  )
}

export default Home
