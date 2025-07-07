import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { List, ListItem, ListItemText, Typography, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TECHNICIANS = ["Ali", "John", "Min"];

const TechnicianJobList = () => {
  const [technician, setTechnician] = useState(TECHNICIANS[0]);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const q = query(
        collection(db, "orders"),
        where("assignedTechnician", "==", technician),
        where("status", "==", "Pending")
      );

      const snapshot = await getDocs(q);
      const jobList = snapshot.docs.map(doc => doc.data());
      setJobs(jobList);
    };

    fetchJobs();
  }, [technician]);

  const handleSelectJob = (job) => {
    localStorage.setItem("selectedJob", JSON.stringify(job));
    navigate("/technician/job");
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        Jobs for Technician: {technician}
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="technician-select-label">Select Technician</InputLabel>
        <Select
          labelId="technician-select-label"
          value={technician}
          onChange={(e) => setTechnician(e.target.value)}
          label="Select Technician"
        >
          {TECHNICIANS.map((tech) => (
            <MenuItem key={tech} value={tech}>
              {tech}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {jobs.length === 0 ? (
        <Typography>No jobs found for {technician}.</Typography>
      ) : (
        <List>
          {jobs.map((job) => (
            <ListItem key={job.orderNo} divider>
              <ListItemText
                primary={`${job.orderNo} - ${job.customerName}`}
                secondary={job.address}
              />
              <Button onClick={() => handleSelectJob(job)} variant="outlined">
                View & Complete
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default TechnicianJobList;
