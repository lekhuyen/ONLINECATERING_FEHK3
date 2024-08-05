import React, { useState } from "react";
import axios from "axios";
import "./Newsletter.css";
import SubHeading from "../../components/Layout/DefaultLayout/SubHeading/Index";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubscribe = async () => {
        if (!email) {
            setMessage("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        try {
            // Send email as part of JSON object with 'email' key
            const response = await axios.post(
                "http://localhost:5034/api/Contact/subscribe",
                { email }, // Sending email in the expected format
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 200) {
                setMessage("Thank you for subscribing! We will be in touch with you shortly and ensure that you receive all the latest updates and news as soon as they're available. We appreciate your interest and look forward to keeping you informed with the most current information and exciting updates. Stay tuned!");
                setEmail("");
            } else {
                setMessage("Something went wrong. Please try again later.");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || "An error occurred while subscribing. Please try again.");
            } else {
                setMessage("An error occurred while subscribing. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app__newsletter">
            <div className="app__newsletter-heading">
                <SubHeading title="Newsletter" />
                <h1 className="headtext__cormorant">Subscribe To Our Newsletter</h1>
                <p className="p__opensans">And never miss latest Updates!</p>
            </div>
            <div className="app__newsletter-input flex__center">
                <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                />
                <button type="button" className="custom__button" onClick={handleSubscribe} disabled={loading}>
                    {loading ? "Subscribing..." : "Subscribe"}
                </button>
            </div>
        </div>
    );
};

export default Newsletter;
