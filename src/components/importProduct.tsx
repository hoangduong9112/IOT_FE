import * as React from "react"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const defaultTheme = createTheme()

export interface ImportProductProps {
  productID?: string
  productName?: string
}

export default function ImportProduct({
  productID,
  productName,
}: ImportProductProps) {
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
            Nhập sản phẩm
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "70%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="productName"
              label="Tên Sản phẩm"
              name="Tên Sản phẩm"
              defaultValue={productName}
              autoFocus
              disabled={!!productID}
            />
            <Typography>Số lượng: 0</Typography>
            <Button
              type="submit"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Nhập kho
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
