import React from "react";
import { Modal, Button, Typography, Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "80%",
  display: "flex",
  overflowY: "auto",
  flexDirection: "column",
  justifyContent: "space-between",
  bgcolor: "var(--color-bg)",
  color: "var(--color-white)",
  border: "2px solid #000",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  p: 4,
};

const AITipsModal = ({ isOpen, handleClose, AITips, title }) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <div>
          <Typography
            variant="h5"
            component="h2"
            sx={{ textAlign: "center", mb: 2 }}
          >
            AI Tips for {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: "var(--color-light)",
              textAlign: "justify",
              fontSize: "1.2rem",
            }}
          >
            {AITips}
          </Typography>
        </div>
        <Button
          sx={{ alignSelf: "center", color: "var(--color-primary)" }}
          onClick={handleClose}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default AITipsModal;
