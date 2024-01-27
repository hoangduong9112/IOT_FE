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
  Typography,
} from "@mui/material"
import { Header } from "../../components/header"
import { useAppSelector } from "../../app/hooks"
import moment from "moment"

const HistoryInventory = () => {
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
        </TableRow>
        {homeState.historyInventory.map((p) => (
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

            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Typography>Đã quét</Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell align="right">Số lượng</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {p.products_scanned.map((production) => (
                        <TableRow>
                          <TableCell>{production.name}</TableCell>
                          <TableCell align="right">
                            {production.count}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
                <Box margin={1}>
                  <Typography>Thiếu</Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell align="right">Số lượng</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {p.products_lack.map((production) => (
                        <TableRow>
                          <TableCell>{production.name}</TableCell>
                          <TableCell align="right">
                            {production.count}
                          </TableCell>
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

export default HistoryInventory
