import React, { useState, useEffect } from 'react';
import ContactService from '../services/ContactService';
import './ContactForm.css';

const ContactForm = ({ contactToEdit, onSubmit }) => {
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
    });

    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (contactToEdit) {
            setFormData({
                id: contactToEdit.id || contactToEdit._id || contactToEdit.contactId || null,
                name: contactToEdit.name || '',
                phone: contactToEdit.phone || '',
                address: contactToEdit.address || '',
                city: contactToEdit.city || '',
                state: contactToEdit.state || '',
                zipCode: contactToEdit.zipCode || ''
            });
            setIsModalOpen(true);
        }
    }, [contactToEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name || formData.name.trim() === '') {
            newErrors.name = 'Full Name is required';
        }
        if (!formData.phone || formData.phone.trim() === '') {
            newErrors.phone = 'Phone Number is required';
        }
        if (!formData.address || formData.address.trim() === '') {
            newErrors.address = 'Address is required';
        }
        if (!formData.city || formData.city.trim() === '') {
            newErrors.city = 'City is required';
        }
        if (!formData.state || formData.state.trim() === '') {
            newErrors.state = 'State is required';
        }
        if (!formData.zipCode || formData.zipCode.trim() === '') {
            newErrors.zipCode = 'Zip Code is required';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const contactData = {
            id: formData.id,
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode
        };

        onSubmit(contactData);
        handleReset();
        setIsModalOpen(false);
    };

    const handleReset = () => {
        setFormData({
            id: null,
            name: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipCode: ''
        });
        setErrors({});
    };

    return (
        <div className="form-container">
            <button
                onClick={() => {
                    handleReset();
                    setIsModalOpen(true);
                }}
                className="add-button"
            >
                Add Contact
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{formData.id ? 'EDIT CONTACT' : 'PERSON ADDRESS FORM'}</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="close-button"
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errors.name && <p className="error">{errors.name}</p>}
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errors.phone && <p className="error">{errors.phone}</p>}
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errors.address && <p className="error">{errors.address}</p>}
                            </div>

                            <div className="form-row">
                                <div className="form-group form-group-inline">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.city && <p className="error">{errors.city}</p>}
                                </div>

                                <div className="form-group form-group-inline">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.state && <p className="error">{errors.state}</p>}
                                </div>

                                <div className="form-group form-group-inline">
                                    <label>Zip Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.zipCode && <p className="error">{errors.zipCode}</p>}
                                </div>
                            </div>

                            <div className="button-group">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="submit-button"
                                >
                                    {formData.id ? 'Update' : 'Add'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="reset-button"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactForm;