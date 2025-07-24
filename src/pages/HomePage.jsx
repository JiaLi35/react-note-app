import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid,
  Button,
  Typography,
  Fab,
} from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";
import { Link as RouterLink } from "react-router";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useSonner } from "sonner";

function HomePage() {
  // 1. load all the notes from the local storage
  const notesLocalStorage = localStorage.getItem("noteslist");
  // 2. set the local storage data into notes state
  const [notes, setNotes] = useState(
    notesLocalStorage ? JSON.parse(notesLocalStorage) : []
  );
  // 13. load all the categories from the local storage
  const categoriesInLocalStorage = localStorage.getItem("categorieslist");
  // 14. set the categories data from local storage to the categories state
  const [categorieslist, setCategoriesList] = useState(
    categoriesInLocalStorage ? JSON.parse(categoriesInLocalStorage) : []
  );
  // 16. create a selectedCategory state
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("updated");

  /* 8. delete */
  const handleNotesDelete = (id) => {
    // 8. do a confirmation alert to confirm delete
    const confirmation = confirm("Do you want to delete this note?");
    if (confirmation) {
      // 9. use filter and remove the note from the notes state
      const updatedNotesList = notes.filter((note) => {
        if (note.id !== id) {
          return true;
        } else {
          return false;
        }
      });
      // 10. update the notes state with the updatedNotesList
      setNotes(updatedNotesList);
      // 11. update the local storage with the updatedNotesList
      localStorage.setItem("noteslist", JSON.stringify(updatedNotesList));
    }
    // 12. show success notification
    toast("Notes deleted successfully");
  };

  const getCategoryLabel = (note) => {
    // find the selected category from the local storage data based on the category id in the note
    const selectedCategory = categorieslist.find((c) => c.id === note.category);
    if (selectedCategory) {
      return selectedCategory.label;
    } else {
      return "No category";
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ py: "60px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* 7. render the length of the notes */}
          <Typography variant="h3">All Notes ({notes.length})</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="note_category_label">Category</InputLabel>
              <Select
                labelId="note_category_label"
                label="Category"
                /* 17. assign the selectedCategory state and onChange (done) */
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                <MenuItem value={"all"}>All Categories</MenuItem>
                {/* 15. use .map() to render all the categories (done) */}
                {categorieslist.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="sort_note_label">Sort by</InputLabel>
              <Select
                labelId="sort_note_label"
                id="sort_note"
                label="Sort By"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <MenuItem value={"updated"}>Last Updated</MenuItem>
                <MenuItem value={"title"}>Title</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Grid container spacing={3} sx={{ mt: "20px" }}>
          {/* 3. use .map() to render the notes */}
          {notes
            .filter((n) => {
              // if all is selected, return true for all (show all)
              if (selectedCategory === "all") {
                return true;
              } else if (n.category === selectedCategory) {
                return true;
              }
              return false;
            })
            .sort((a, b) => {
              if (sortBy === "updated") {
                return b.updatedAt - a.updatedAt;
              } else {
                return a.title.toLowerCase().localeCompare(b.title);
              }
            })
            .map((note) => (
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} key={note.id}>
                <Card>
                  <CardContent>
                    {/* 4. render the notes title */}
                    <Typography>{note.title}</Typography>
                    <Chip
                      label={getCategoryLabel(note)}
                      sx={{ my: "10px" }}
                    ></Chip>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {new Date(note.updatedAt).toLocaleString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* 5. go to edit page */}
                    <Button
                      color="primary"
                      startIcon={<EditIcon />}
                      component={RouterLink}
                      to={`/edit/${note.id}`}
                    >
                      Edit
                    </Button>
                    {/* 6. attach a onclick event handling for delete */}
                    <Button
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleNotesDelete(note.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: "15px", right: "15px" }}
        component={RouterLink}
        to="/add"
      >
        <AddIcon />
      </Fab>
    </>
  );
}

export default HomePage;
