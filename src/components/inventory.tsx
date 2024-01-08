import * as React from "react"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useAppSelector } from "../app/hooks"
import { sumProducts } from "../utils/utilsFunction"
import * as _ from "lodash"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { clientAdmin } from "../services/mqtt"

const defaultTheme = createTheme()

export default function Inventory() {
  const homeState = useAppSelector((state) => state.home)
  const [rfid, setRfid] = React.useState([])

  const [isScan, setIsScan] = React.useState(false)
  const [exportProducts, setExportProducts] = React.useState([])
  const [lackProducts, setlackProducts] = React.useState([])

  const showRedToast = () => {
    toast.error("Failure", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: "red",
        color: "white",
      },
    })
  }

  const showGreenToast = () => {
    toast.success("Success", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: "green",
        color: "white",
      },
    })
  }

  // const handleScan = () => {
  //   if (isScan) {
  //     setIsScan(false)
  //     const result = stop()
  //     const products = []
  //     setRfid(result)
  //     result.forEach((id) => {
  //       const product = homeState.products.find((product) => product.UID === id)
  //       products.push(product)
  //     })
  //     setExportProducts(sumProducts(products))
  //     setlackProducts(
  //       sumProducts(_.differenceBy(homeState.products, products, "_id")),
  //     )
  //   } else {
  //     setIsScan(true)
  //     scan()
  //   }
  // }
  const topicToSubscribe = "rfid/uid"
  const rfidList = React.useMemo(() => {
    return homeState.products.map((product) => product.UID)
  }, [homeState.products])

  const handleScan = React.useCallback(async () => {
    console.log("isScan", isScan)
    if (isScan) {
      setIsScan(false)
      clientAdmin.unsubscribe(topicToSubscribe, (err) => {
        if (!err) {
          console.log("Unsubscribed from topic: ", topicToSubscribe)
        } else {
          console.error("Unsubscription error:", err)
        }
      })
    } else {
      setIsScan(true)

      clientAdmin.subscribe(topicToSubscribe, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${topicToSubscribe}`)
        } else {
          console.error("Subscription error:", err)
        }
      })
      clientAdmin.on("message", (topic, message) => {
        console.log(`Received message on topic ${topic}: ${message.toString()}`)
        if (rfidList.includes(message.toString())) {
          setRfid((rfid) => [...rfid, message.toString()])
          showGreenToast()
        } else {
          showRedToast()
        }
      })

      // Callback when an error occurs
      clientAdmin.on("error", (err) => {
        console.error("MQTT clientAdmin error:", err)
      })

      // Callback when the clientAdmin is disconnected
      clientAdmin.on("close", () => {
        console.log("MQTT clientAdmin disconnected")
      })
    }
  }, [isScan, rfidList])

  React.useEffect(() => {
    const products = []
    rfid.forEach((id) => {
      const product = homeState.products.find((product) => product.UID === id)
      products.push(product)
    })
    setExportProducts(sumProducts(products))
    setlackProducts(
      sumProducts(_.differenceBy(homeState.products, products, "_id")),
    )
  }, [rfid])

  const handleSubmit = () => {
    const IDs = []
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
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Hoàn thành
            </Button>
            {exportProducts.length > 0 && <Typography>Đã quét</Typography>}
            {exportProducts.length > 0 && (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Số lượng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exportProducts.map((row) => (
                    <TableRow key={row.categoryID}>
                      <TableCell>{row.categoryName}</TableCell>
                      <TableCell>{row.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {lackProducts.length > 0 && <Typography>Thiếu</Typography>}
            {lackProducts.length > 0 && (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Số lượng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lackProducts.map((row) => (
                    <TableRow key={row.categoryID}>
                      <TableCell>{row.categoryName}</TableCell>
                      <TableCell>{row.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
