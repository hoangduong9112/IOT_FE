import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/system"
import { Link, Modal } from "@mui/material"
import ImportProduct from "./importProduct"
import ExportProduct from "./exportProduct"
import Inventory from "./inventory"

export function Header() {
  const [openImport, setOpenImport] = React.useState(false)

  const [openExport, setOpenExport] = React.useState(false)
  const [openInventory, setOpenInventory] = React.useState(false)

  const handleImportClose = () => {
    setOpenImport(false)
  }
  const handleInventoryClose = () => {
    setOpenInventory(false)
  }
  const handleExportClose = () => {
    setOpenExport(false)
  }
  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Quản lý kho hàng</Typography>
          <Box>
            <Button
              color="inherit"
              onClick={() => {
                setOpenImport(true)
              }}
            >
              Nhập Kho
            </Button>

            <Button
              color="inherit"
              onClick={() => {
                setOpenExport(true)
              }}
            >
              Xuất Kho
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                setOpenInventory(true)
              }}
            >
              Kiểm Kê
            </Button>
            <Button onClick={() => {}}>
              <Link href="/history" style={{ color: "white" }}>
                Lịch sử nhập xuất
              </Link>
            </Button>
            <Button onClick={() => {}}>
              <Link href="/historyInventory" style={{ color: "white" }}>
                Lịch sử kiểm kê
              </Link>
            </Button>
          </Box>
        </Toolbar>
        <Modal
          open={openImport}
          onClose={handleImportClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <ImportProduct />
        </Modal>
        <Modal
          open={openExport}
          onClose={handleExportClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <ExportProduct />
        </Modal>
        <Modal
          open={openInventory}
          onClose={handleInventoryClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Inventory />
        </Modal>
      </AppBar>
    </div>
  )
}
