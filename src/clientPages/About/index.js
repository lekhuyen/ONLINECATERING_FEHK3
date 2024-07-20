import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAboutData } from '../../redux/Information/aboutSlice';

const About = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const aboutData = useSelector((state) => state.about.items);
    const status = useSelector((state) => state.about.status);
    const error = useSelector((state) => state.about.error);

    useEffect(() => {
        dispatch(fetchAboutData());
    }, [dispatch]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    // Static grouping logic
    const staticGroups = {
        "Group All": aboutData.filter(about => about.title.includes('')), // Example logic
        "Group A": aboutData.filter(about => about.title.includes('ABOUT')), // Example logic
        "Group B": aboutData.filter(about => about.title.includes('OUR VISION')), // Example logic
        "Group C": aboutData.filter(about => about.title.includes('OUR MISSION')), // Example logic
        "Group D": aboutData.filter(about => about.title.includes('OUR CORE VALUES')), // Example logic
        "Group E": aboutData.filter(about => about.title.includes('DEI STATEMENT')), // Example logic
        "Group F": aboutData.filter(about => about.title.includes('GIVING BACK')),
        "Group G": aboutData.filter(about => about.title.includes('ENDLESS Inspiration')), // Example logic
    };

    return (
        <div className="container mt-5">

            {/* About container */}
            <div className='mb-4'>
                <h2>About Us</h2>
                {staticGroups["Group A"].map((about) => (
                    <div className="card mb-3" key={about.id}>
                        <div className="card-body">
                            <h4 className="card-title">{about.title}</h4>
                            <p className="card-text">{about.content}</p>
                            <div className="row">
                                {about.imagePaths && about.imagePaths.map((image, index) => (
                                    <div className="col-md-4" key={index}>
                                        <img
                                            src={`http://localhost:5034${image}`}
                                            alt={`About ${index}`}
                                            className="img-fluid"
                                            style={{ marginBottom: '10px' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* OUR VISION container */}
            <div className='mb-4'>
                <h2>Our Vision</h2>
                {staticGroups["Group B"].map((about) => (
                    <div className="card mb-3" key={about.id}>
                        <div className="card-body">
                            <h4 className="card-title">{about.title}</h4>
                            <p className="card-text">{about.content}</p>
                            <div className="row">
                                {about.imagePaths && about.imagePaths.map((image, index) => (
                                    <div className="col-md-4" key={index}>
                                        <img
                                            src={`http://localhost:5034${image}`}
                                            alt={`Vision ${index}`}
                                            className="img-fluid"
                                            style={{ marginBottom: '10px' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* DEI STATEMENT VALUES container */}
            <div className='mb-4'>
                <h2>DEI Statement</h2>
                {staticGroups["Group C"].map((about) => (
                    <div className="card mb-3" key={about.id}>
                        <div className="card-body">
                            <h4 className="card-title">{about.title}</h4>
                            <p className="card-text">{about.content}</p>
                            <div className="row">
                                {about.imagePaths && about.imagePaths.map((image, index) => (
                                    <div className="col-md-4" key={index}>
                                        <img
                                            src={`http://localhost:5034${image}`}
                                            alt={`DEI Statement ${index}`}
                                            className="img-fluid"
                                            style={{ marginBottom: '10px' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* GIVING BACK container */}
            <div className='mb-4'>
                <h2>Giving Back</h2>
                {staticGroups["Group D"].map((about) => (
                    <div className="card mb-3" key={about.id}>
                        <div className="card-body">
                            <h4 className="card-title">{about.title}</h4>
                            <p className="card-text">{about.content}</p>
                            <div className="row">
                                {about.imagePaths && about.imagePaths.map((image, index) => (
                                    <div className="col-md-4" key={index}>
                                        <img
                                            src={`http://localhost:5034${image}`}
                                            alt={`Giving Back ${index}`}
                                            className="img-fluid"
                                            style={{ marginBottom: '10px' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Access container */}
            <div className='mb-4'>
                <h2>Access</h2>
                {staticGroups["Group E"].map((about) => (
                    <div className="card mb-3" key={about.id}>
                        <div className="card-body">
                            <h4 className="card-title">{about.title}</h4>
                            <p className="card-text">{about.content}</p>
                            <div className="row">
                                {about.imagePaths && about.imagePaths.map((image, index) => (
                                    <div className="col-md-4" key={index}>
                                        <img
                                            src={`http://localhost:5034${image}`}
                                            alt={`Access ${index}`}
                                            className="img-fluid"
                                            style={{ marginBottom: '10px' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Endless Inspiration container */}
            <div className='mb-4'>
                <h2>Endless Inspiration</h2>
                {staticGroups["Group F"].map((about) => (
                    <div className="card mb-3" key={about.id}>
                        <div className="card-body">
                            <h4 className="card-title">{about.title}</h4>
                            <p className="card-text">{about.content}</p>
                            <div className="row">
                                {about.imagePaths && about.imagePaths.map((image, index) => (
                                    <div className="col-md-4" key={index}>
                                        <img
                                            src={`http://localhost:5034${image}`}
                                            alt={`Endless Inspiration ${index}`}
                                            className="img-fluid"
                                            style={{ marginBottom: '10px' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* OUR CORE VALUES container */}
            <div className='mb-4'>
                <h2>Our Core Values</h2>
                {staticGroups["Group G"].map((about) => (
                    <div className="card mb-3" key={about.id}>
                        <div className="card-body">
                            <h4 className="card-title">{about.title}</h4>
                            <p className="card-text">{about.content}</p>
                            <div className="row">
                                {about.imagePaths && about.imagePaths.map((image, index) => (
                                    <div className="col-md-4" key={index}>
                                        <img
                                            src={`http://localhost:5034${image}`}
                                            alt={`Core Values ${index}`}
                                            className="img-fluid"
                                            style={{ marginBottom: '10px' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default About;
