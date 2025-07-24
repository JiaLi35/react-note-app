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
import { Link as RouterLink } from "react-router";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

function HomePage() {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

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
          <Typography variant="h3">All Notes (3)</Typography>
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
                defaultValue={"all"}
                labelId="note_category_label"
                id="note_category"
                label="Category"
                // value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <MenuItem value={"all"}>All Categories</MenuItem>
                <MenuItem value={"personal"}>Personal</MenuItem>
                <MenuItem value={"work"}>Work</MenuItem>
                <MenuItem value={"ideas"}>Ideas</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="sort_note_label">Sort by</InputLabel>
              <Select
                defaultValue={"updated"}
                labelId="sort_note_label"
                id="sort_note"
                label="sort"
                // value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <MenuItem value={"updated"}>Last Updated</MenuItem>
                <MenuItem value={"title"}>Title</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Grid container spacing={3} sx={{ mt: "20px" }}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card>
              <CardContent>
                <Typography>Which theme should we pick?</Typography>
                <Chip label="Ideas" sx={{ my: "10px" }}></Chip>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Jul 20, 2025 6:58 PM
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  color="primary"
                  startIcon={<EditIcon />}
                  component={RouterLink}
                  to="/edit/1"
                >
                  Edit
                </Button>
                <Button color="error" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card>
              <CardContent>
                <Typography>Project Making Week</Typography>
                <Chip label="Personal" sx={{ my: "10px" }}></Chip>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Jul 20, 2025 6:58 PM
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  color="primary"
                  startIcon={<EditIcon />}
                  component={RouterLink}
                  to="/edit/1"
                >
                  Edit
                </Button>
                <Button color="error" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card>
              <CardContent>
                <Typography>Assignment Sheets</Typography>
                <Chip label="Work" sx={{ my: "10px" }}></Chip>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Jul 20, 2025 6:58 PM
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  color="primary"
                  startIcon={<EditIcon />}
                  component={RouterLink}
                  to="/edit/1"
                >
                  Edit
                </Button>
                <Button color="error" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
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
