import React, { useState } from "react";
import OrderForm from "./OrderForm";
import {Container,Typography,Button,Paper,Box, Divider} from "@mui/material";

const Orders = () => {
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const handleOrderSubmit = (data) => {
    setOrderData(data);
    setOrderSubmitted(true);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      {orderSubmitted ? (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Order Submitted Successfully
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="body1"><strong>Order No:</strong> {orderData.orderNo}</Typography>
          <Typography variant="body1"><strong>Technician:</strong> {orderData.assignedTechnician}</Typography>
          <Typography variant="body1"><strong>Customer:</strong> {orderData.customerName}</Typography>

          <Box mt={3}>
            <Button variant="contained" color="primary" onClick={() => setOrderSubmitted(false)}>
              Create New Order
            </Button>
          </Box>
        </Paper>
      ) : (
        <OrderForm onSubmit={handleOrderSubmit} />
      )}
    </Container>
  );
};

export default Orders;
