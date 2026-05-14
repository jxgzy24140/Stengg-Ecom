import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { CategoryContextProvider } from "./contexts/CategoryContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <CategoryContextProvider>
      <Toaster position="top-right" />
      <AppRoutes />
    </CategoryContextProvider>
  );
}

export default App;
