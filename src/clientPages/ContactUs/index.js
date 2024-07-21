import React, { useState } from 'react';
import styles from './ContactUs.module.scss'
import clsx from 'clsx';
import classNames from "classnames/bind";
import { createContact } from '../../redux/Information/contactSlice';
import { useDispatch } from 'react-redux';
const cx = classNames.bind(styles)

const Contact = () => {
  const dispatch = useDispatch();

  const [contact, setContact] = useState({
    fullName: '',
    email: '',
    phone: '',
    content: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    try {
      const now = new Date();
      const lastSubmitTime = localStorage.getItem('lastSubmitTime');
      const lastSubmitEmail = localStorage.getItem('lastSubmitEmail');

      // Check if the email has already reached the daily limit
      if (lastSubmitEmail === contact.email && lastSubmitTime) {
        const lastSubmitDate = new Date(lastSubmitTime);
        if (now.getDate() === lastSubmitDate.getDate()) {
          // Same email address has already submitted today
          setModalMessage('You have reached the limit for sending messages today from this email.');
          setShowModal(true);
          return;
        }
      }

      setIsSubmitting(true);

      const contactWithDate = {
        ...contact,
        responseDate: now.toISOString()
      };

      await dispatch(createContact(contactWithDate));

      setContact({
        fullName: '',
        email: '',
        phone: '',
        content: ''
      });

      localStorage.setItem('lastSubmitTime', now.toString());
      localStorage.setItem('lastSubmitEmail', contact.email);

      setIsSubmitting(false);
      setModalMessage('Contact message sent successfully!');
      setShowModal(true);
    } catch (error) {
      console.error('Error creating contact:', error);
      setSubmitError('Failed to send contact message. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={clsx(styles.contactUs_container, "app__bg")}>
      <div className={cx("contactUs_header_title")}><h1>Contact Us</h1></div>
      <div className={cx("contactUs_row")}>
        <div className="container mt-3 mb-1">
          <div className='container mt-5'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.041305664508!2d-73.97928762414293!3d40.761116234607684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258fbd0b82edf%3A0x41af87d148d1a374!2s9%20W%2053rd%20St%2C%20New%20York%2C%20NY%2010019%2C%20USA!5e0!3m2!1sen!2s!4v1721497213869!5m2!1sen!2s"
              style={{ border: "0", width: "1300px", height: "500px" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className='container mt-3 d-flex'>
            <div className="mt-5 pt-5">
                  <h5 className={cx("contactUs_title")}>Please feel free to contact us if you have any questions or suggestion</h5>
                  <p className={cx("contactUs_text")}>
                    The beginning of your perfect event is having the best possible
                    understanding of your vision.
                  </p>
                  <p className={cx("contactUs_text")}>
                    Let us know, in as much detail as you can, what you’re dreaming of and we’ll get the party started!
                  </p>
                  <p className={cx("contactUs_text")}>
                    You can also contact us by +1 212-344-1230 or +1 212-555-1230 or via onlinecatering@gmail.com
                  </p>
                  <p className={cx("contactUs_text")}>
                    Online Catering is located at 9 W 53rd St, New York, NY 10019, USA
                  </p>
            </div>
            <div className='row mt-3 ml-auto'>
              <h4 className={cx("contactUs_title")}>Contact Form</h4>
                <div className='container mb-3'>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="fullName" className={cx("contactUs_form")}>Full Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        value={contact.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className={cx("contactUs_form")}>Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phone" className={cx("contactUs_form")}>Phone:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="content" className={cx("contactUs_form")}>Content:</label>
                      <textarea
                        className="form-control"
                        id="content"
                        name="content"
                        value={contact.content}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <button type="submit" className={cx("contactUs_button")} disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>

                    {submitError && <div className="text-danger mt-2">{submitError}</div>}
                  </form>

                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Alert</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{modalMessage}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
