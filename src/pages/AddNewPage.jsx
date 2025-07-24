import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Editor from "react-simple-wysiwyg";
import { toast } from "sonner";
import { nanoid } from "nanoid";

/*
array for content stuffs
  [
    {
      id : "dkjr91384ndgjnaa", // nanoid
      title: "New note", 
      category: "msdfjasd21845" // category id from category 
      content: ""
    }
  ]
*/

function AddNewPage() {
  /*
    rule for form fields state: one state for one field
  */

  // 1. load the categories data from local storage
  const dataInLocalStorage = localStorage.getItem("categorieslist");
  // 2. create a state to store the categories data from local storage
  const [categories, setCategories] = useState(
    dataInLocalStorage ? JSON.parse(dataInLocalStorage) : []
  );
  // 3. load the notes data from local storage
  const notesLocalStorage = localStorage.getItem("noteslist");
  console.log(notesLocalStorage);
  // 4. create a state to store the notes data from local storage
  const [notes, setNotes] = useState(
    notesLocalStorage ? JSON.parse(notesLocalStorage) : []
  );
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("Welcome to <b>Forward College</b>");

  const handleAddNew = () => {
    // 6. check for error - make sure all the fields are filled up
    if (content === "" || title === "" || category === "") {
      toast("Please fill up all the fields");
    } else {
      // 7. add new note data into the notes state
      const updatedNotesList = [
        ...notes,
        {
          id: nanoid(),
          title: title,
          category: category,
          content: content,
        },
      ];
      setNotes(updatedNotesList);
      // show notification of success message
      toast("Post saved successfully.");
      // 8. update the notes in local storage
      localStorage.setItem("noteslist", JSON.stringify(updatedNotesList));
    }
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          py: "60px",
        }}
      >
        <Typography variant="h3">Add New Note</Typography>
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mt: "20px",
          }}
        >
          <TextField
            fullWidth
            id="note_title"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <FormControl fullWidth sx={{ mt: "20px" }}>
            <InputLabel id="note_category_label">Category</InputLabel>
            <Select
              labelId="note_category_label"
              id="note_category"
              label="Category"
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              {/* 5. load the categories using .map - value pass in as id (done) */}
              {categories.map((category) => (
                <MenuItem value={category.id}>{category.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mt: "20px" }}>
            <Typography variant="body1" sx={{ mb: "10px" }}>
              Content
            </Typography>
            <Editor
              containerProps={{ style: { height: "400px" } }}
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              mt: "20px",
            }}
          >
            <Button color="primary" variant="contained" onClick={handleAddNew}>
              Save Note
            </Button>
            <Button variant="outlined" component={RouterLink} to="/">
              Cancel
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default AddNewPage;
