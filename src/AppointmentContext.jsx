import { createContext, useState, useContext } from "react";

const AppointmentContext = createContext();

export const useAppointment = () => useContext(AppointmentContext);

export function AppointmentProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <AppointmentContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </AppointmentContext.Provider>
  );
}
