import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  InputLabel,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { nanoid } from "nanoid";
import { toast } from "sonner";

/*
  Requirements:
  - data will be stored in the local storage
  - state for managing the categories
  - Add new category
  - update category
  - delete category

  [
    { id: 684847, label: "Personal" },
    { id: 8489, label: "Work" },
    { id: 886, label: "Idea" }
  ]
*/

function CategoriesPage() {
  // 1. load the data from the local storage (key is categories).
  const dataInLocalStorage = JSON.parse(localStorage.getItem("categorieslist"));
  // 2. assign the local storage to the state (if data is empty, pass in empty array)
  const [categories, setCategories] = useState(dataInLocalStorage || []);
  // 3. state for the add new category field
  const [label, setLabel] = useState("");

  // function for updating the local storage
  const updatedLocalStorage = (updatedCategoryList) => {
    localStorage.setItem("categorieslist", JSON.stringify(updatedCategoryList));
  };

  // 4. function to add new category into the state and also save it into local storage
  const handleAddNew = () => {
    // 4a. make sure the field is not empty, show error
    if (label === "") {
      toast("Please fill in the field");
    } else {
      // 4b. add the new category to the state
      const updatedCategory = [...categories, { id: nanoid(), label: label }];
      setCategories(updatedCategory);
      // show notification of success message
      toast("New category has been added.");
      // reset the field
      setLabel("");
      // 4c. update the local storage with the updated categories
      updatedLocalStorage(updatedCategory);
    }
  };

  // 5. function to update the category name
  const handleUpdate = (id, label) => {
    // 5a. prompt the user to update the new label for the selected category (pass in the current value)
    const newCategoryName = prompt(
      "Please enter the new name for the category",
      label
    );

    if (newCategoryName) {
      const updatedCategory = categories.map((category) => {
        // 5b. update the categories with the updated category label
        if (category.id === id) {
          category.label = newCategoryName; // update the value
        }
        return category;
      });
      setCategories(updatedCategory);
      // show notification of success message
      toast("Category has been successfully updated.");
      // 5c. update the local storage with the udpated categories
      updatedLocalStorage(updatedCategory);
    }
  };

  // 6. function to delete the category
  const handleDelete = (id) => {
    const confirmation = confirm(
      "Are you sure you want to delete this category?"
    );

    if (confirmation) {
      // 6a. delete the category from the categories state
      const updatedCategory = categories.filter((category) => {
        if (category.id !== id) {
          return true; // keep
        } else {
          return false; // throw away
        }
      });
      setCategories(updatedCategory);
      // show notification of success message
      toast("Category has been successfully deleted.");
      // 6b. update the local storage with the updated categories
      updatedLocalStorage(updatedCategory);
    }
  };

  return (
    <>
      <Container sx={{ py: 6 }}>
        <Typography variant="h4">Manage Categories</Typography>
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mt: "20px",
          }}
        >
          <InputLabel>Add New Category</InputLabel>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              mt: "5px",
            }}
          >
            <TextField
              fullWidth
              label="Category"
              variant="outlined"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
            <Button color="primary" variant="contained" onClick={handleAddNew}>
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
          <InputLabel>Existing Categories ({categories.length})</InputLabel>
          <List sx={{ width: "100%" }}>
            {categories.map((category) => (
              <ListItem
                key={category.id}
                disableGutters
                divider
                secondaryAction={
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <IconButton
                      onClick={() => handleUpdate(category.id, category.label)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(category.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText primary={`${category.label}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
}

export default CategoriesPage;
