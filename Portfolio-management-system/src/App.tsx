import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Login } from "./pages/Login";
import { AppToaster } from "./components/ui/toast/AppToaster";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* Toaster reads theme from Redux store internally */}
        <AppToaster />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
