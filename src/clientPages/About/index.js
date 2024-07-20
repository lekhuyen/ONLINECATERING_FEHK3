import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

    return (
        <div className="container mt-5">
            <h2>ABOUT</h2>

            {aboutData.map((about) => (
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
    );
};

export default About;
