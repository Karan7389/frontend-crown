import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Contexts
import { AuthProvider } from "./AuthContext";
import {
  AppointmentProvider,
  useAppointment,
} from "./AppointmentContext";

// Components
import AppointmentModal from "./AppointmentModal";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppointmentProvider>
        <BrowserRouter>
          <App />
          <AppointmentModalWrapper />
        </BrowserRouter>
      </AppointmentProvider>
    </AuthProvider>
  </React.StrictMode>
);

// Wrap the modal to access context
function AppointmentModalWrapper() {
  const { open, closeModal } = useAppointment();

  return <AppointmentModal isOpen={open} onClose={closeModal} />;
}
