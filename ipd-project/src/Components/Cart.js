import * as React from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function createData(name, price, count, total) {
  return { name, price, count, total };
}

// const rows = [createData("Paneer", 34, 2, 68), createData("Butter", 45, 1, 45)];

export default function BasicTable() {
  const history = useHistory();
  const [cart, setCart] = React.useState([]);

  useEffect(() => {
    axios
      .get("https://items-cart.herokuapp.com/cartread")
      .then((response) => {
        setCart(response.data);
        console.log("data from api", response.data);
      })
      .catch((error) => {
        console.log("error from api", error);
      });
  }, []);

  const removeItemFromCart = (name) => {
    console.log(name);
    const productsAfterDeletion = cart;
    const t = productsAfterDeletion.filter((x) => x !== name);
    setCart(t);

    axios
      .post("https://items-cart.herokuapp.com/cartdelete", { name: name })
      .then(console.log("Delete successful"));
  };

  // function loadScript(src) {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.onload = () => {
  //       resolve(true);
  //     };
  //     script.onerror = () => {
  //       resolve(false);
  //     };
  //     document.body.appendChild(script);
  //   });
  // }

  function redirectToPaymentGateway() {
    var options = {
      key: "rzp_test_Tvbaz9yzPV9ztE", // Enter the Key ID generated from the Dashboard
      amount: "35", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "IPD Mart",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "order_INmHerGT6AQK5I", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        history.push("./cart");
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      <Box style={{ margin: "2% auto 0 auto", width: "80%" }}>
        <Grid container>
          <Grid item xs={12}>
            <TableContainer
              component={Paper}
              style={{ width: "75%", margin: "auto" }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow style={{ background: "#f0f0f0" }}>
                    <TableCell>
                      <Typography style={{ fontWeight: "600" }}>
                        Product name
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography style={{ fontWeight: "600" }}>
                        Price
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography style={{ fontWeight: "600" }}>
                        Quantity
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography style={{ fontWeight: "600" }}>
                        Total
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Amul Butter</TableCell>
                    <TableCell>35</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>35</TableCell>
                  </TableRow>
                  {cart.map((product) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ maxWidth: "5px" }}
                      >
                        {product.product_name}
                      </TableCell>
                      <TableCell align="left">
                        {product.product_price}
                      </TableCell>
                      <TableCell align="left">
                        {product.product_quantity}
                      </TableCell>
                      <TableCell align="left">
                        {product.product_price * product.product_quantity}
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          onClick={() => {
                            removeItemFromCart(product.product_name);
                          }}
                        >
                          remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item style={{ marginLeft: "auto" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={redirectToPaymentGateway}
            >
              Buy
            </Button>
            {/* <WebcamCapture/> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
