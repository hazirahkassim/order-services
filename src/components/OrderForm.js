import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Select, MenuItem,FormControl, InputLabel,Button,TextField} from "@mui/material";

const technicians = ["Ali", "John", "Min"];
const services = ["WiFi Setup", "PC Repair", "Network Troubleshooting"];

const OrderForm = ({ onSubmit }) => {
  const [orderNo, setOrderNo] = useState("");
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    problem: "",
    servicesNeeded: "",
    quotedPrice: "",
    assignedTechnician: "",
    adminNotes: "",
  });

  useEffect(() => {
    setOrderNo("ORDER" + Math.floor(1000 + Math.random() * 9000));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      ...formData,
      orderNo,
      status: "Pending",
      createdAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, "orders", orderNo), newOrder);
      onSubmit(newOrder);
    } catch (err) {
      console.error("Error saving order: ", err);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="title">
          <h2>Create New Order</h2>
        </div>

        <p>
          <strong>Order No:</strong> {orderNo}
        </p>

        <FormControl fullWidth margin="normal" required>
          <TextField
            name="customerName"
            label="Customer Name"
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <TextField
            name="phone"
            label="Phone Number"
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <TextField
            name="address"
            label="Address"
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <TextField
            name="problem"
            label="Problem Description"
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="services-label">Select Service</InputLabel>
          <Select
            labelId="services-label"
            name="servicesNeeded"
            onChange={handleChange}
            defaultValue=""
          >
            <MenuItem value="">
              <em>Select Service</em>
            </MenuItem>
            {services.map((service) => (
              <MenuItem key={service} value={service}>
                {service}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <TextField
            name="quotedPrice"
            label="Quoted Price"
            type="number"
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="tech-label">Assign Technician</InputLabel>
          <Select
            labelId="tech-label"
            name="assignedTechnician"
            onChange={handleChange}
            defaultValue=""
          >
            <MenuItem value="">
              <em>Assign Technician</em>
            </MenuItem>
            {technicians.map((tech) => (
              <MenuItem key={tech} value={tech}>
                {tech}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            name="adminNotes"
            label="Notes to Technician"
            onChange={handleChange}
            multiline
            rows={3}
          />
        </FormControl>

        <div className="submit">
          <Button type="submit" variant="contained" size="large">
            Submit Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
