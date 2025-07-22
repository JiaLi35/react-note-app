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
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
          }}
        >
          <Typography variant="h3">All Notes (3)</Typography>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="note_category_label">Category</InputLabel>
              <Select
                labelId="note_category_label"
                id="note_category"
                value={category}
                label="Category"
                onChange={(event) => setCategory(event.target.value)}
              >
                <MenuItem value={"All Categories"}>All Categories</MenuItem>
                <MenuItem value={"Personal"}>Personal</MenuItem>
                <MenuItem value={"Work"}>Work</MenuItem>
                <MenuItem value={"Ideas"}>Ideas</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="sort_note_label">Sort by</InputLabel>
              <Select
                labelId="sort_note_label"
                id="sort_note"
                value={sort}
                label="sort"
                onChange={(event) => setSort(event.target.value)}
              >
                <MenuItem value={"Last Updated"}>Last Updated</MenuItem>
                <MenuItem value={"Title"}>Title</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Grid container spacing={3} sx={{ mt: "20px" }}>
          <Grid size={4}>
            <Card>
              <CardContent>
                <Typography>Which theme should we pick?</Typography>
                <Chip label="Ideas" sx={{ my: "10px" }}></Chip>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Jul 20, 2025 6:58 PM
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" startIcon={<DeleteIcon />}>
                  Edit
                </Button>
                <Button color="error" startIcon={<EditIcon />}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid size={4}>
            <Card>
              <CardContent>
                <Typography>Project Making Week</Typography>
                <Chip label="Personal" sx={{ my: "10px" }}></Chip>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Jul 20, 2025 6:58 PM
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" startIcon={<DeleteIcon />}>
                  Edit
                </Button>
                <Button color="error" startIcon={<EditIcon />}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid size={4}>
            <Card>
              <CardContent>
                <Typography>Assignment Sheets</Typography>
                <Chip label="Work" sx={{ my: "10px" }}></Chip>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Jul 20, 2025 6:58 PM
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" startIcon={<DeleteIcon />}>
                  Edit
                </Button>
                <Button color="error" startIcon={<EditIcon />}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default HomePage;
