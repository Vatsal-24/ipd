import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import oreo from "./../Images/oreo.png";
import lilhearts from "./../Images/lilhearts.jpg";
import monaco from "./../Images/monaco.jpg";
import jimjam from "./../Images/jimjam.jpg";
import goodday from "./../Images/goodday.jpg";
import paneer from "./../Images/paneer.jpg";
import milk from "./../Images/amul.jpg";
import butter from "./../Images/butter.jpg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function ProductCard() {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [count, setCount] = React.useState(1);

  const biscuits = [
    {
      name: "Oreo",
      price: 10,
      desc: "Splash into the classic taste of milk creme with the Original Oreo with smooth Vanilla cookie.",
      image: oreo,
    },
    {
      name: "Good day",
      price: 20,
      desc: "Britannia Good Day Butter Biscuits are crunchy delicious biscuits made with the goodness of butter.",
      image: goodday,
    },
    {
      name: "Little Hearts",
      price: 15,
      desc: "Little Hearts biscuits literally melt in mouth, giving you a sweet taste that is irresistible and so tempting.",
      image: lilhearts,
    },
    {
      name: "Monaco",
      price: 30,
      desc: "Monaco is a light, crispy, salty biscuit and one of the highest sold tea time snack biscuits in India",
      image: monaco,
    },
    {
      name: "Treat Jim Jam",
      price: 35,
      desc: "Cream sandwiched between two crispy layers of biscuits topped with a juicy jam & finished by the delicate sugar crystals",
      image: jimjam,
    },
  ];

  const milkProd = [
    {
      name: "Milk",
      price: 50,
      desc: "Amul is pasteurized in processing plants & pouch-packed to make it convenient for consumers.",
      image: milk,
    },
    {
      name: "Butter",
      price: 45,
      desc: "Unsalted Butter is made from fresh cream and nothing else. It doesn't contain any salt at all",
      image: butter,
    },
    {
      name: "Paneer",
      price: 34,
      desc: "Most convenient form of paneer. Paneer having smooth, uniform texture and softness.",
      image: paneer,
    },
  ];

  const categoryHeadingStyle = {
    fontSize: "22px",
    fontWeight: "500",
  };

  const itemNameStyling = {
    fontSize: "16px",
    fontWeight: "500",
  };

  const itemDescStyling = {
    fontSize: "13px",
    fontWeight: "400",
    color: "grey",
  };

  const priceStyling = {
    fontSize: "16px",
    fontWeight: "500",
    color: "grey",
  };
  const handleBuyButton = (name, description, price) => {
    setName(name);
    setDescription(description);
    setPrice(price);
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
    setCount(1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const incrementCount = () => {
    if (count < 10) setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const addToCart = (price, count, name) => {
    const obj = {
      id: 1,
      name: name,
      price: price,
      quantity: count,
    };

    axios
      .post("https://items-cart.herokuapp.com/cartpost", {
        pid: 1,
        name: name,
        price: price,
        quantity: count,
      })
      .then((response) => {
        console.log("Response: ", response.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

    console.log(obj);
    handleClose();
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <Box style={{ width: "90%", margin: "auto", marginTop: "2%" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography style={categoryHeadingStyle}>Milk Products: </Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            {milkProd.map((item) => (
              <>
                <Grid item lg={3} md={3} sm={4} xs={6}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt={item.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.desc}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          handleBuyButton(item.name, item.desc, item.price)
                        }
                      >
                        Buy Now
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography style={categoryHeadingStyle}>Biscuits: </Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            {biscuits.map((item) => (
              <Grid item lg={3} md={3} sm={4} xs={6}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() =>
                        handleBuyButton(item.name, item.desc, item.price)
                      }
                    >
                      Buy Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-title">{name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
          <Grid
            container
            lg={12}
            md={12}
            sm={12}
            xs={12}
            style={{ display: "flex", alignItems: "space-between" }}
          >
            <Grid item>
              <Button onClick={decrementCount}>-</Button>
              <span style={itemDescStyling}>{count}</span>
              <Button onClick={incrementCount}>+</Button>
            </Grid>
            <Grid
              style={{
                marginLeft: "auto",
                justify: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={priceStyling}>Total: ₹{price * count}</span>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => addToCart(price, count, name)}>
            Add to cart
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
