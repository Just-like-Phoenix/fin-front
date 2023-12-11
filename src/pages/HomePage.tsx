import { styled, Box } from "@mui/material";

const HomePageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
}));

const HomePage = () => {
  return <HomePageBox>QWERTYUIOPUP</HomePageBox>;
};

export default HomePage;
