import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
<Toaster position="top-right" />
        <Navbar />

        <main className="flex-grow">
          <AppRoutes />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
