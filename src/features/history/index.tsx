import * as React from "react"
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  TableHead,
  Table,
  Collapse,
  TableBody,
} from "@mui/material"
import { Header } from "../../components/header"
import { useAppSelector } from "../../app/hooks"
import moment from "moment"

const History = () => {
  const [open, setOpen] = React.useState(false)
  const homeState = useAppSelector((state) => state.home)

  return (
    <Box>
      <Box>
        <Header />
      </Box>
      <Box
        style={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px" }}
      >
        <TableRow>
          <TableCell></TableCell>
          <TableCell component="th" scope="row">
            Thời gian
          </TableCell>
          <TableCell>Hành động</TableCell>
        </TableRow>

        {homeState.history.map((p) => (
          <TableRow>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? "-" : "+"}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              {moment(p.createdTime.toString()).format(
                "MMMM Do YYYY, h:mm:ss a",
              )}
            </TableCell>
            <TableCell>{p.action}</TableCell>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell align="right">Số lượng</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {p.products.map((p) => (
                        <TableRow>
                          <TableCell>{p.name}</TableCell>
                          <TableCell align="right">{p.count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        ))}
      </Box>
    </Box>
  )
}

export default History
