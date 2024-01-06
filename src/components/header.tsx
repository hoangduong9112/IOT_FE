import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/system"

export function Header() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Quản lý kho hàng</Typography>
          <Box>
            <Button color="inherit" onClick={() => {}}>
              Nhập Kho
            </Button>

            <Button color="inherit" onClick={() => {}}>
              Xuất Kho
            </Button>
            <Button color="inherit" onClick={() => {}}>
              Kiểm Kê
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}
