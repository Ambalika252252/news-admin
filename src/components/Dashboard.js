import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Service from './Service';
import Gallery from './Gallery';
import News from './News';
import './ClassStyle.css';

const Dashboard = () => {
    const [activeLink, setActiveLink] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') {
            setActiveLink('/dashboard/services');
        } else {
            setActiveLink(location.pathname);
        }
    }, [location.pathname]);

    const getLinkClassName = (path) => (
        path === activeLink ? 'navbarItems active' : 'navbarItems'
    );


    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <h2>Dashboard</h2>
                <div style={styles.nav}>
                    <Link to="/dashboard/services"
                        className={getLinkClassName('/dashboard/services')}
                        onClick={() => setActiveLink('/dashboard/services')}
                        >
                        Services
                    </Link>
                    <Link to="/dashboard/gallery"
                        className={getLinkClassName('/dashboard/gallery')}
                        onClick={() => setActiveLink('/dashboard/gallery')}
                        >
                        Gallery
                    </Link>
                    <Link to="/dashboard/news"
                        className={getLinkClassName('/dashboard/news')}
                        onClick={() => setActiveLink('/dashboard/news')}
                        >
                        News
                    </Link>
                </div>
            </div>
            <div style={styles.content}>
                <Routes>
                    <Route path="" element={<Navigate to="services" />} />
                    <Route path="services" element={<Service />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="news" element={<News />} />
                </Routes>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
    },
    sidebar: {
        width: '200px',
        backgroundColor: '#638889',
        padding: '20px',
    },
    nav: {
        display: 'flex',
        flexDirection: 'column',
    },
    active: {
        backgroundColor: '#007bff',
        color: 'white',
    },
    content: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#9DBC98',
    }
};

export default Dashboard;
