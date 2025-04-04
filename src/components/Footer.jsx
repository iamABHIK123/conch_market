import React from "react";
import { Facebook, WhatsApp, LinkedIn } from "@mui/icons-material";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer className="bg-light py-5">
      <Container>
        {/* Policy Section */}
        <Grid container spacing={4} justifyContent="center" textAlign="center">
          <Grid item xs={12} sm={4}>
            <img src="https://cdn-icons-png.flaticon.com/512/4340/4340494.png" alt="Exchange Policy" width="50" />
            <Typography variant="h6" className="mt-2">Easy Exchange Policy</Typography>
            <Typography variant="body2">We offer hassle-free exchange policy</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" alt="Return Policy" width="50" />
            <Typography variant="h6" className="mt-2">7 Days Return Policy</Typography>
            <Typography variant="body2">We provide 7 days free return policy</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img src="https://cdn-icons-png.flaticon.com/512/724/724664.png" alt="Customer Support" width="50" />
            <Typography variant="h6" className="mt-2">Best Customer Support</Typography>
            <Typography variant="body2">We provide 24/7 customer support</Typography>
          </Grid>
        </Grid>

        {/* Subscribe Section */}
        <div className="text-center my-4">
          <Typography variant="h5"><b>Subscribe now & get 20% off</b></Typography>
          <Typography variant="body2">Get the latest updates and exclusive deals.</Typography>
          <div className="d-flex justify-content-center mt-2">
            <TextField label="Enter Your Email" variant="outlined" size="small" className="w-50" />
            <Button variant="contained" color="primary" className="ms-2">Subscribe</Button>
          </div>
        </div>

        {/* Footer Info */}
        <Grid container spacing={4} className="mt-5" style={{ position: "relative",
    left: "6.2rem"}}   >
          <Grid item xs={12} sm={4}>
            <Typography variant="h6"><b>FOREVER.</b></Typography>
            <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6"><b>COMPANY</b></Typography>
            <ul className="list-unstyled">
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6"><b>GET IN TOUCH</b></Typography>
            <Typography variant="body2">+1-000-000-0000</Typography>
            <Typography variant="body2">greatstickdev@gmail.com</Typography>
            <div className="d-flex mt-2">
              <a href="#" className="me-3 text-dark"><Facebook fontSize="large" /></a>
              <a href="#" className="me-3 text-dark"><WhatsApp fontSize="large" /></a>
              <a href="#" className="text-dark"><LinkedIn fontSize="large" /></a>
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
