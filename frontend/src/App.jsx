import Sidebar from "./components/Sidebar.jsx";
import BatchOperations from "./pages/BatchOperations.jsx";

export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <BatchOperations />
      </main>
    </div>
  );
}
