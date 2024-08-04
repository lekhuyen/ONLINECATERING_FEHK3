import React from "react";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router-dom
import { images } from "../../constants";
import SubHeading from "../../components/Layout/DefaultLayout/SubHeading/Index";

const FindUs = () => {
    const navigate = useNavigate();

    const handleVisitClick = () => {
        navigate("/contact");
    };

    return (
        <div className="app__bg app__wrapper section__padding" id="contact">
            <div className="app__wrapper_info">
                <SubHeading title="Contact" />
                <h1 className="headtext__cormorant" style={{ marginBottom: "3rem" }}>
                    Find Us
                </h1>
                <div className="app__wrapper-content">
                    <p className="p__opensans">
                        Lane Ends Bungalow, Whatcroft Hall Lane, Rudheath, CW9 75G
                    </p>
                    <p
                        className="p__cormorant"
                        style={{ color: "#DCCA87", margin: "2rem 0" }}
                    >
                        Opening Hours
                    </p>
                    <p className="p__opensans">Mon - Fri: 10:00 am - 02:00 am</p>
                    <p className="p__opensans">Sat - Sun: 10:00 am - 03:00 am</p>
                </div>
                <button
                    type="button"
                    className="custom__button"
                    style={{ marginTop: "2rem" }}
                    onClick={handleVisitClick}
                >
                    Visit Us
                </button>
            </div>

            <div className="app__wrapper_img">
                <img src={images.findus} alt="finus_img" />
            </div>
        </div>
    );
};

export default FindUs;
