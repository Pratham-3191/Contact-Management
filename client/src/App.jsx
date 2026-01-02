import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts`);
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Failed to fetch contacts", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2 text-2xl font-semibold">
            Contact Management
          </h1>
          <p className="text-gray-600">
            Add and manage your contacts
          </p>
        </div>

        {/* Contact Form */}
        <div className="mb-12">
          <ContactForm onSuccess={fetchContacts} />
        </div>

        {/* Contact List */}
        <div>
          <ContactList
            contacts={contacts}
            onDelete={fetchContacts}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
