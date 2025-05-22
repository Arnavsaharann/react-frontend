import axios from 'axios';

const API_URL = 'http://localhost:8080/contacts';

const ContactService = {
    addContact(contact) {
        return axios.post(API_URL, contact);
    },
    getAllContacts() {
        return axios.get(API_URL);
    },
    updateContact(id, contact) {
        return axios.put(`${API_URL}/${id}`, contact);
    },
    deleteContact(id) {
        return axios.delete(`${API_URL}/${id}`);
    },
};

export default ContactService;