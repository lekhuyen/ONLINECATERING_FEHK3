import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchContacts, respondToContact } from '../../redux/Information/contactSlice';
import { FiSend } from "react-icons/fi";
import { RiArrowGoBackLine } from "react-icons/ri";

export default function ResponseMessage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contacts.items);
    const contactStatus = useSelector((state) => state.contacts.status);
    const error = useSelector((state) => state.contacts.error);
    const [responseMessage, setResponseMessage] = useState("");
    const [currentContact, setCurrentContact] = useState(null);

    useEffect(() => {
        if (contactStatus === "idle") {
            dispatch(fetchContacts());
        } else {
            const contact = contacts.find((c) => c.id === id);
            setCurrentContact(contact);
        }
    }, [contactStatus, dispatch, id, contacts]);

    const handleResponseSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(respondToContact({ id, responseMessage }));
            // Re-fetch the contact to get the updated status
            await dispatch(fetchContacts());
            navigate("/contactus");
        } catch (error) {
            console.error("Error responding to contact:", error);
        }
    };



    const handleGoBack = () => {
        navigate("/contactus");
    };

    if (contactStatus === "loading") {
        return <div>Loading...</div>;
    }

    if (contactStatus === "failed") {
        return <div>{error}</div>;
    }

    if (!currentContact) {
        return <div>Contact not found</div>;
    }

    // Determine if the admin has responded
    const isAdminResponded = currentContact.isAdminResponse;

    return (
        <div className="container">
            <h2>Response Message</h2>
            <div>
                <p>User Message: {currentContact.content}</p>
                {/* Show response form only if admin has not responded */}
                {!isAdminResponded && (
                    <form onSubmit={handleResponseSubmit}>
                        <div className="form-group">
                            <label htmlFor="responseMessage">Response</label>
                            <input
                                type="text"
                                className="form-control"
                                id="responseMessage"
                                value={responseMessage}
                                onChange={(e) => setResponseMessage(e.target.value)}
                            />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary">
                        <FiSend />
                        </button>
                    </form>
                )}
                {/* Show admin response if admin has responded */}
                {isAdminResponded && (
                    <div>
                        <p>Admin Response: {currentContact.responseMessage}</p>
                    </div>
                )}
                <br />
            </div>
            <div className="mt-3">
                <button className="btn btn-secondary" onClick={handleGoBack}><RiArrowGoBackLine /></button>
            </div>
            {/* Show status */}
            <div>
                <span>Status: </span>
                <span style={{ color: isAdminResponded ? 'green' : 'red' }}>
                    {isAdminResponded ? 'Responded' : 'Not Responded'}
                </span>
            </div>
        </div>
    );
}
