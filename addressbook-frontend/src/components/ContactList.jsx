import React, { useState, useEffect } from 'react';
import ContactService from '../services/ContactService';
import './ContactList.css';

const ContactList = ({ contactToEdit, onEdit }) => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await ContactService.getAllContacts();
            console.log('Fetched contacts:', response.data); // Log the response to debug
            setContacts(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching contacts:', err);
            setError('Failed to load contacts.');
        }
    };

    const handleDelete = async (id) => {
        console.log('Deleting contact with ID:', id); // Log the ID being deleted
        if (!id) {
            alert('Cannot delete contact: ID is missing. Please check the console for the "Fetched contacts" log to verify the ID field.');
            return;
        }
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await ContactService.deleteContact(id);
                setContacts(contacts.filter((contact) => (contact.id || contact._id || contact.contactId) !== id));
                alert('Contact deleted successfully!');
            } catch (err) {
                console.error('Error deleting contact:', err);
                alert('Failed to delete contact: ' + (err.response?.data || err.message));
            }
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h1>Address Book</h1>
                </div>
                <div className="card-body">
                    <h2>Contact List</h2>
                    {error && <p className="error-message">{error}</p>}
                    <div className="table-container">
                        <table className="contact-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Zip Code</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.length === 0 && !error ? (
                                    <tr>
                                        <td colSpan="7" className="no-data">No contacts found.</td>
                                    </tr>
                                ) : (
                                    contacts.map((contact) => (
                                        <tr key={contact.id || contact._id || contact.contactId || Math.random()}>
                                            <td>{contact.name}</td>
                                            <td>{contact.phone}</td>
                                            <td>{contact.address}</td>
                                            <td>{contact.city}</td>
                                            <td>{contact.state}</td>
                                            <td>{contact.zipCode}</td>
                                            <td>
                                                <button
                                                    onClick={() => onEdit(contact)}
                                                    className="edit-button"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(contact.id || contact._id || contact.contactId)}
                                                    className="delete-button"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactList;