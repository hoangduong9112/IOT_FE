import * as React from "react"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { scan, stop } from "../services/mqtt"
import { useAppDispatch } from "../app/hooks"
import { addProductsAsync, getProductsAsync } from "../features/home/homeSlice"
import { v4 as uuidv4 } from "uuid"

const defaultTheme = createTheme()

// eslint-disable-next-line no-dupe-args
export default function ImportProduct({ categoryName = "", categoryID = "" }) {
  const [isScan, setIsScan] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [rfid, setRfid] = React.useState([])
  const dispatch = useAppDispatch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(
      addProductsAsync({
        category_name: categoryName || input,
        category_id: categoryID || uuidv4(),
        UID: rfid,
      }),
    )
  }

  const handleScan = () => {
    console.log("isScan", isScan)
    if (isScan) {
      setIsScan(false)
      const result = stop()
      setRfid(result)
    } else {
      setIsScan(true)
      scan()
    }
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
              id="categoryName"
              label="Tên Sản phẩm"
              name="Tên Sản phẩm"
              defaultValue={categoryName}
              autoFocus
              disabled={!!categoryID}
              onChange={(e) => {
                setInput(e.target.value)
              }}
            />
            <Typography>Số lượng: {rfid.length}</Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleScan}
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
