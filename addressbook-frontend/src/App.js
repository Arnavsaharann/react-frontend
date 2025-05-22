import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import ContactService from './services/ContactService';

function App() {
    const [contactToEdit, setContactToEdit] = useState(null);

    const handleAddOrUpdateContact = async (contactData) => {
        try {
            if (contactData.id) {
                await ContactService.updateContact(contactData.id, contactData);
                alert('Contact updated successfully!');
            } else {
                await ContactService.addContact(contactData);
                alert('Contact added successfully!');
            }
            window.location.reload(); // Refresh ContactList
        } catch (error) {
            console.error('Error saving contact:', error);
            alert('Failed to save contact: ' + (error.response?.data || error.message));
        }
    };

    const handleEdit = (contact) => {
        setContactToEdit(contact);
    };

    return (
        <div>
            <ContactForm
                contactToEdit={contactToEdit}
                onSubmit={handleAddOrUpdateContact}
            />
            <ContactList
                contactToEdit={contactToEdit}
                onEdit={handleEdit}
            />
        </div>
    );
}

export default App;