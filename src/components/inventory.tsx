import * as React from "react"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const defaultTheme = createTheme()

export default function Inventory() {
  const [isScan, setIsScan] = React.useState(false)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      data,
    })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            border: "1px solid #000000",
          }}
        >
          <Typography component="h1" variant="h5" style={{ marginTop: "16px" }}>
            Kiểm kê
          </Typography>
          <Box sx={{ mt: 1, width: "70%" }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => (isScan ? setIsScan(false) : setIsScan(true))}
            >
              {!isScan ? "Quét sản phẩm" : "Kết thúc"}
            </Button>
            {isScan && (
              <Typography variant="body2" color="text.secondary" align="center">
                Đang quét sản phẩm, vui lòng đưa máy quét qua các sản phẩm
              </Typography>
            )}
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Hoàn thành
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
