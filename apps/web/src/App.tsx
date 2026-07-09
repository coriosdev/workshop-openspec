import { useState } from "react";
import { AppointmentForm } from "./features/appointments/AppointmentForm";
import { AppointmentList } from "./features/appointments/AppointmentList";
import "./features/appointments/appointments.css";

export function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="appointments-page">
      <header className="appointments-header">
        <h1>Appointments</h1>
        <button type="button" onClick={() => setShowForm((visible) => !visible)}>
          {showForm ? "Cancel" : "+ New appointment"}
        </button>
      </header>

      {showForm && (
        <AppointmentForm onSuccess={() => setShowForm(false)} />
      )}

      <AppointmentList />
    </main>
  );
}
