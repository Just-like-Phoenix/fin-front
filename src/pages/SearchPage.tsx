import { Button, Card, Stack, TextField } from "@mui/material";

const SearchPage = () => {
  return (
    <Card sx={{ margin: 2, width: "100%" }}>
      <Stack spacing={2} margin={2} direction={"row"}>
        <TextField label="УНП" type="text" variant="outlined" fullWidth />
        <Button variant="contained">Найти</Button>
      </Stack>
    </Card>
  );
};

export default SearchPage;
