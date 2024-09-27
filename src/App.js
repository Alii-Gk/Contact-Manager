import React, { useState, useReducer, useEffect } from "react";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import ContactContext from "./context/ContactContext";
import contactReducer from "./reducers/contactReducer";
import ConfirmationModal from "./components/ConfirmationModal";
import "./styles.css";

const initialContacts = JSON.parse(localStorage.getItem("contacts")) || [];

function App() {
  const [contacts, dispatch] = useReducer(contactReducer, initialContacts);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [modalData, setModalData] = useState({ isOpen: false, action: null });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleDeleteGroup = () => {
    setModalData({
      isOpen: true,
      action: () => {
        dispatch({ type: "DELETE_GROUP", payload: selectedContacts });
        setSelectedContacts([]);
        handleCloseModal();
      },
    });
  };

  const handleCloseModal = () => {
    setModalData({ isOpen: false, action: null });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts,
        dispatch,
        selectedContacts,
        setSelectedContacts,
        setModalData,
      }}
    >
      <div className="app-container">
        <h1>مدیریت مخاطبین</h1>
        <ContactForm />
        <input
          type="text"
          placeholder="جستجو بر اساس نام یا ایمیل..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleDeleteGroup} className="delete-group-btn">
          حذف گروهی
        </button>
        <ContactList searchTerm={searchTerm} />
        {modalData.isOpen && (
          <ConfirmationModal
            onClose={handleCloseModal}
            onConfirm={modalData.action}
          />
        )}
      </div>
    </ContactContext.Provider>
  );
}

export default App;
