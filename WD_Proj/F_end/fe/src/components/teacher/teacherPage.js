import React from "react";
import { Box } from "@mui/material";
import AddSlot from "./createSlotForm";
import ViewSlots from "./ViewSlots";

const TeacherPage = () => {
  return (
    <>
      <h1>Your Dashboard</h1>
      <Box>
        <AddSlot />
      </Box>
      <Box mt={4}>
        <ViewSlots />
      </Box>
    </>
  );
};

export default TeacherPage;
