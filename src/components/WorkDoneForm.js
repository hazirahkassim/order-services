import React, { useState } from "react";
import {TextField,Button,FormControl,Typography,Box} from "@mui/material";
import { db } from "../firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const WorkDoneForm = ({ selectedJob }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    workDone: "",
    extraCharges: "",
    finalAmount: "",
    remarks: "",
    technician: selectedJob?.assignedTechnician || "",
    timestamp: new Date().toLocaleString(),
  });

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) return alert("No job selected");

    try {
      const jobRef = doc(db, "orders", selectedJob.orderNo);

      await updateDoc(jobRef, {
        ...formData,
        status: "Job Done", 
        completedAt: serverTimestamp(),
      });

      const time = new Date().toLocaleTimeString();
      const message = `Hi ${selectedJob.customerName}, job ${selectedJob.orderNo} is completed by Technician ${formData.technician} at ${time}. Please check and leave feedback. Thank you!`;

      const phone = selectedJob.phone?.replace(/\D/g, ""); 
      if (phone && phone.length >= 9) {
        const encodedMsg = encodeURIComponent(message);
        const waLink = `https://wa.me/6${phone}?text=${encodedMsg}`;
        window.open(waLink, "_blank");
      } else {
        alert("Missing or invalid customer phone number.");
      }

      const managerNumber = "601160528986"; 
      const managerMsg = `Job ${selectedJob.orderNo} completed by ${formData.technician} at ${time}. Please verify and follow up.`;
      const waManagerLink = `https://wa.me/${managerNumber}?text=${encodeURIComponent(managerMsg)}`;
      window.open(waManagerLink, "_blank");

      alert("Job submitted and notifications sent!");

      navigate("/technician");
    } catch (err) {
      console.error("Error submitting job: ", err);
      alert("Something went wrong.");
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 500, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Complete Job: {selectedJob?.orderNo}
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            name="workDone"
            label="Work Done Description"
            onChange={handleChange}
            multiline
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            name="extraCharges"
            label="Extra Charges (RM)"
            type="number"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            name="finalAmount"
            label="Final Amount (RM)"
            type="number"
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            name="remarks"
            label="Remarks"
            onChange={handleChange}
            multiline
          />
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit & Notify
        </Button>
      </form>
    </Box>
  );
};

export default WorkDoneForm;
