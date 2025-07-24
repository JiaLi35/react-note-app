import { useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Editor from "react-simple-wysiwyg";
import { toast } from "sonner";

function EditNote() {
  const navigate = useNavigate();
  // get id from url params
  const { id } = useParams();

  // 1. load all the notes from the local storage
  const notesInLocalStorage = localStorage.getItem("noteslist");
  // 2. set the local storage data into notes state
  const [notes, setNotes] = useState(
    notesInLocalStorage ? JSON.parse(notesInLocalStorage) : []
  );

  // 13. load all the categories from the local storage
  const categoriesInLocalStorage = localStorage.getItem("categorieslist");
  // 14. set the categories data from local storage to the categories state
  const [categorieslist, setCategoriesList] = useState(
    categoriesInLocalStorage ? JSON.parse(categoriesInLocalStorage) : []
  );

  // loading the existing data from the notes
  const selectedNote = notes.find((n) => n.id === id);

  /*
    rule for form fields state: one state for one field
  */
  const [title, setTitle] = useState(selectedNote ? selectedNote.title : "");
  const [category, setCategory] = useState(
    selectedNote ? selectedNote.category : ""
  );
  const [content, setContent] = useState(
    selectedNote ? selectedNote.content : "Welcome to <b>Forward College</b>"
  );

  const handleUpdate = () => {
    // check for error - make sure all the fields are filled up
    if (title === "" || content === "" || category === "") {
      toast("Please fill up all the fields");
    } else {
      const updatedNote = [...notes];
      setNotes(
        updatedNote.map((note) => {
          if (note.id === id) {
            note.title = title;
            note.category = category;
            note.content = content;
          }
          return note;
        })
      );

      // update the new note data into the notes state
      setNotes(updatedNote);
      // update the notes in local storage
      localStorage.setItem("noteslist", JSON.stringify(updatedNote));
    }

    // 9. show success message
    toast("Note has been updated");
    // 10. redirect back to home page
    navigate("/");
  };

  // if selectedNote is undefined, return not found message
  if (!selectedNote) {
    return <div>Note not found</div>;
  }

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          py: "60px",
        }}
      >
        <Typography variant="h3">Edit Note</Typography>
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
            onChange={(event) => setTitle(event.target.value)}
          />
          <FormControl fullWidth sx={{ mt: "20px" }}>
            <InputLabel id="note_category_label">Category</InputLabel>
            <Select
              labelId="note_category_label"
              id="note_category"
              label="Category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categorieslist.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.label}
                </MenuItem>
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
            <Button color="primary" variant="contained" onClick={handleUpdate}>
              Save Changes
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

export default EditNote;
