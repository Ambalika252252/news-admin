import React, { useState } from 'react';
import axios from 'axios';

const Service = () => {
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !detail) {
            setErrorMessage('All fields are required.');
            setSuccessMessage('');
            return;
        }

        try {
            const response = await axios.post('http://localhost:9000/service', { title, detail });
            if (response.status === 200 || response.status === 201) {
                setSuccessMessage('Service added successfully');
                setErrorMessage('');
                setTitle('');
                setDetail('');
            } else {
                console.log('Unexpected response status', response.status);
                setErrorMessage(`Unexpected response: ${response.status}`);
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('Failed to add service. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.heading}>Add Service</div>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={styles.input}
                        placeholder="Enter title"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="detail">Detail</label>
                    <textarea
                        id="detail"
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        style={styles.input}
                        placeholder="Enter detail"
                    />
                </div>
                {successMessage && <p style={styles.success}>{successMessage}</p>}
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                <button type="submit" style={styles.button}>Submit</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        backgroundColor: '#9DBC98',
        alignItems: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        height: '90%',
        width: '80%',
    },
    heading: {
        fontSize: '1.5rem',
        fontWeight: '600',
    },

    formGroup: {
        marginBottom: '15px',
        textAlign: '-webkit-left',
    },
    input: {
        width: '95%',
        padding: '8px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginTop: '5px',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#638889',
        border: 'none',
        borderRadius: '4px',
        marginTop: '10px',
        boxShadow: 'rgb(0 0 0 / 44%) -2px 1px 10px',
        alignSelf: 'center',
        width: '30vw',
    },
    success: {
        color: 'green',
        marginBottom: '15px',
    },
    error: {
        color: 'red',
        marginBottom: '15px',
    },
};

export default Service;
