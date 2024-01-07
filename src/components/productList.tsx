import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { Button, Modal } from "@mui/material"
import ImportProduct from "./importProduct"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getProductsAsync } from "../features/home/homeSlice"
import * as _ from "lodash"
import { sumProducts } from "../utils/utilsFunction"

export default function ProductList() {
  const dispatch = useAppDispatch()
  const homeState = useAppSelector((state) => state.home)
  const products = sumProducts(homeState.products)
  React.useEffect(() => {
    dispatch(getProductsAsync())
  }, [dispatch, homeState.shouldReload])
  const [open, setOpen] = React.useState(false)
  const [currentName, setCurrentName] = React.useState("")
  const [currentID, setCurrentID] = React.useState("")

  const handleLinkClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow key={row.categoryID}>
              <TableCell>{row.categoryName}</TableCell>
              <TableCell>{row.count}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setCurrentName(row.categoryName)
                    setCurrentID(row.categoryID)
                    handleLinkClick()
                  }}
                >
                  Nhập sản phẩm
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ImportProduct categoryID={currentID} categoryName={currentName} />
      </Modal>
    </React.Fragment>
  )
}
