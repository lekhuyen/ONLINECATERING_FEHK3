import React, { useState } from "react";
import axios from "axios";
import "./Newsletter.css";
import SubHeading from "../../components/Layout/DefaultLayout/SubHeading/Index";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setError(""); // Clear error message when email input changes
    };

    const handleSubscribe = async () => {
        // Check if email field is empty
        if (!email.trim()) {
            setError("Email address cannot be empty.");
            return;
        }

        setLoading(true);
        setError(""); // Clear previous error

        try {
            const response = await axios.post(
                "http://localhost:5034/api/Contact/subscribe",
                { email },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 200) {
                setMessage("");
                setEmail("");
            } else {
                setError("Something went wrong. Please try again later.");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || "An error occurred while subscribing. Please try again.");
            } else {
                setError("An error occurred while subscribing. Please try again.");
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
            {error && <p className="app__newsletter-error">{error}</p>}
            {message && <p className="app__newsletter-message">{message}</p>}
        </div>
    );
};

export default Newsletter;
