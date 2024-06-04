import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { List, ListItem, ListItemText, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import { NotificationManager } from "react-notifications";

const ViewSlots = () => {
  const [slots, setSlots] = useState([]);
  const [applications, setApplications] = useState([]);
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.user.token);
  const teacherId = useSelector((state) => state.user.teacherId);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5600/teacher/getSlotbySectionId",
          { sectionId: teacherId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.msg !== "No slots found") {
          setSlots(response.data.sv);
        } else {
          setSlots([]);
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();
  }, [token, teacherId]);

  const handleDelete = async (sectionId) => {
    try {
      const response = await axios.post(
        "http://localhost:5600/teacher/deleteSlot",
        { sectionId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.msg === "Slot deleted successfully") {
        NotificationManager.success("Slot deleted successfully!");
        setSlots((prevSlots) => prevSlots.filter((slot) => slot.sectionId !== sectionId));
      } else {
        NotificationManager.error("Error deleting slot!");
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
      NotificationManager.error("Error deleting slot!");
    }
  };

  const handleViewApplications = async (slotId) => {
    try {
      const response = await axios.get("http://localhost:5600/teacher/viewApplications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.apps) {
        setApplications(response.data.apps.filter(app => app.slot === slotId));
        setOpen(true);
      } else {
        NotificationManager.info(response.data.msg);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      NotificationManager.error("Error fetching applications!");
    }
  };

  const handleAcceptApplication = async (slotId, studentEmail) => {
    try {
      const response = await axios.patch(
        `http://localhost:5600/teacher/acceptApplication/${slotId}/${studentEmail}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.msg === "Application accepted") {
        NotificationManager.success("Application accepted!");
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.studentEmail === studentEmail ? { ...app, status: "accepted" } : app
          )
        );
      } else {
        NotificationManager.error(response.data.msg);
      }
    } catch (error) {
      console.error("Error accepting application:", error);
      NotificationManager.error("Error accepting application!");
    }
  };

  const handleRejectApplication = async (slotId, studentEmail) => {
    try {
      const response = await axios.patch(
        `http://localhost:5600/teacher/rejectApplication/${slotId}/${studentEmail}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.msg === "Application rejected") {
        NotificationManager.success("Application rejected!");
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.studentEmail === studentEmail ? { ...app, status: "rejected" } : app
          )
        );
      } else {
        NotificationManager.error(response.data.msg);
      }
    } catch (error) {
      console.error("Error rejecting application:", error);
      NotificationManager.error("Error rejecting application!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h6" gutterBottom>
        Slots Created by Teacher
      </Typography>
      {slots.length > 0 ? (
        <List>
          {slots.map((slot) => (
            <ListItem key={slot._id} divider>
              <ListItemText
                primary={`Course: ${slot.course.courseName}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      Section: {slot.sectionId} <br />
                      Duration: {slot.duration} hours <br />
                      Work Hours: {slot.workHours} <br />
                      Application Deadline: {new Date(slot.applicationDeadline).toLocaleDateString()} <br />
                      Created At: {new Date(slot.createdAt).toLocaleDateString()}
                    </Typography>
                  </>
                }
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(slot.sectionId)}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleViewApplications(slot._id)}
              >
                View Applications
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No slots found</Typography>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Applications</DialogTitle>
        <DialogContent>
          {applications.length > 0 ? (
            <List>
              {applications.map((app, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={`Student: ${app.studentName}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          Email: {app.studentEmail} <br />
                          Section: {app.sectionId} <br />
                          Status: {app.status} <br />
                          Statement: {app.studentStatement} <br />
                          Favourite: {app.favourite ? "Yes" : "No"}
                        </Typography>
                      </>
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAcceptApplication(app.slot, app.studentEmail)}
                    disabled={app.status === "accepted"}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRejectApplication(app.slot, app.studentEmail)}
                    disabled={app.status === "rejected"}
                  >
                    Reject
                  </Button>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No applications found</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default ViewSlots;
