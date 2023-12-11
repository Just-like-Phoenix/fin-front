import ReactDOM from "react-dom/client";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <SnackbarProvider
    maxSnack={5}
    preventDuplicate
    dense
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SnackbarProvider>
);
