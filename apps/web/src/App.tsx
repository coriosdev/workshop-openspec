import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AppointmentForm } from "./features/appointments/AppointmentForm";
import { AppointmentList } from "./features/appointments/AppointmentList";

export function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Appointments</h1>
          <Button
            type="button"
            variant={showForm ? "outline" : "default"}
            onClick={() => setShowForm((visible) => !visible)}
          >
            {showForm ? "Cancel" : "+ New appointment"}
          </Button>
        </header>

        {showForm && (
          <div className="mb-8">
            <AppointmentForm onSuccess={() => setShowForm(false)} />
          </div>
        )}

        <AppointmentList />
      </div>
    </main>
  );
}
