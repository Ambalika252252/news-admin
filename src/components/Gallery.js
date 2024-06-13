import React, { useState } from 'react';
import axios from 'axios';

const Gallery = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageUrl) {
            setErrorMessage('All fields are required.');
            setSuccessMessage('');
            return;
        }

        try {
            const response = await axios.post('http://localhost:9000/gallery', { imageUrl });
            if (response.status === 200 || response.status === 201) {
                setSuccessMessage('Image added to gallery successfully');
                setErrorMessage('');
                setImageUrl('');
            } else {
                console.log('Unexpected response status', response.status);
                setErrorMessage(`Unexpected response: ${response.status}`);
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error posting image', error);
            setErrorMessage('Failed to post image. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.heading}>Add Pictures</div>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        style={styles.input}
                        placeholder="Enter image URL"
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
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#9DBC98',
    },

    heading: {
        fontSize: '1.5rem',
        fontWeight: '600',
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        height: '90%',
        width: '80%',
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

export default Gallery;
