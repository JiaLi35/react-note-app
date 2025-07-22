import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function CategoriesPage() {
  const [category, setCategory] = useState("");
  return (
    <>
      <Container maxWidth="md" sx={{ py: "60px" }}>
        <Typography variant="h3">Manage Categories</Typography>
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mt: "20px",
          }}
        >
          <Typography variant="h6">Add New Category</Typography>
          <Box sx={{ display: "flex", gap: "10px", minHeight: 55, mt: "10px" }}>
            <TextField
              fullWidth
              id="note_category"
              label="Category Name"
              variant="outlined"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            ></TextField>
            <Button color="primary" variant="contained">
              Add
            </Button>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mt: "20px",
          }}
        >
          <Typography variant="h6">Existing Categories (3)</Typography>
          <List>
            <ListItem>
              <ListItemText primary="Personal" />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "20px",
                }}
              >
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton color="text.secondary" disabled>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText primary="Work" />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "20px",
                }}
              >
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton color="text.secondary" disabled>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText primary="Ideas" />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "20px",
                }}
              >
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton color="text.secondary" disabled>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
            <Divider component="li" />
          </List>
        </Paper>
      </Container>
    </>
  );
}

export default CategoriesPage;
