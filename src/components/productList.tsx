import * as React from "react"
import Link from "@mui/material/Link"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { Button } from "@mui/material"
import { useState } from "react"

// Generate Order Data
function createData(id: number, name: string, count: number) {
  return { id, name, count }
}

const rows = [
  createData(1, "IPhone 13 Pro Max", 59),
  createData(1, "IPhone 13 Pro", 59),
  createData(1, "IPhone 15 Pro Max", 59),
  createData(1, "IPhone 12 Pro Max", 59),
  createData(1, "IPhone 11", 59),
  createData(1, "IPhone 15", 59),
]

export default function ProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLinkClick = () => {
    setIsModalOpen(true)
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.count}</TableCell>
              <TableCell>
                <Button onClick={handleLinkClick}>
                  <Link href="/importProduct">Nhập sản phẩm</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
