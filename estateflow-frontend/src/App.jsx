import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
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
