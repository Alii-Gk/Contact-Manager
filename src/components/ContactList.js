import React, { useContext, useState } from "react";
import ContactContext from "../context/ContactContext";

function ContactList({ searchTerm }) {
  const {
    contacts,
    dispatch,
    selectedContacts,
    setSelectedContacts,
    setModalData,
  } = useContext(ContactContext);
  const [editingContact, setEditingContact] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const toggleSelect = (id) => {
    setSelectedContacts(
      selectedContacts.includes(id)
        ? selectedContacts.filter((contactId) => contactId !== id)
        : [...selectedContacts, id]
    );
  };

  const handleDelete = (id) => {
    setModalData({
      isOpen: true,
      action: () => dispatch({ type: "DELETE_CONTACT", payload: id }),
    });
  };

  const handleEdit = (contact) => {
    setEditingContact(contact.id);
    setEditName(contact.name);
    setEditEmail(contact.email);
  };

  const saveEdit = (id) => {
    dispatch({
      type: "EDIT_CONTACT",
      payload: { id, name: editName, email: editEmail },
    });
    setEditingContact(null);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ul className="contact-list">
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact) => (
          <li key={contact.id}>
            <input
              type="checkbox"
              checked={selectedContacts.includes(contact.id)}
              onChange={() => toggleSelect(contact.id)}
            />
            {editingContact === contact.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
                <button onClick={() => saveEdit(contact.id)}>ذخیره</button>
              </>
            ) : (
              <span>
                {contact.name} ({contact.email})
              </span>
            )}
            <button onClick={() => handleEdit(contact)}>ویرایش</button>
            <button onClick={() => handleDelete(contact.id)}>حذف</button>
          </li>
        ))
      ) : (
        <li>مخاطبی یافت نشد.</li>
      )}
    </ul>
  );
}

export default ContactList;
