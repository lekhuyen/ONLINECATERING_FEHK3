import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteContact, fetchContacts } from "../../redux/Information/contactSlice";
import { FaCheckSquare, FaRegTimesCircle, FaRegTrashAlt } from "react-icons/fa";
import { TbMessageReply } from "react-icons/tb";

const ContactAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contacts = useSelector((state) => state.contacts.items);
  const contactStatus = useSelector((state) => state.contacts.status);
  const error = useSelector((state) => state.contacts.error);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const contactsPerPage = 6;

  useEffect(() => {
    if (contactStatus === "idle") {
      dispatch(fetchContacts());
    }
  }, [contactStatus, dispatch]);

  const handleRespondClick = (id) => {
    navigate(`/contactus/responsemessage/${id}`);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteContact(id));
  };

  const handleDateChange = (e) => {
    const selectedMonthYear = e.target.value;
    if (selectedMonthYear) {
      setSelectedDate(new Date(selectedMonthYear));
    } else {
      setSelectedDate(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Pagination
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredContacts = currentContacts.filter((contact) => {
    // Filter by date
    if (selectedDate) {
      const contactDate = new Date(contact.responseDate);
      if (
        contactDate.getMonth() !== selectedDate.getMonth() ||
        contactDate.getFullYear() !== selectedDate.getFullYear()
      ) {
        return false;
      }
    }

    // Filter by search term (case insensitive)
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      contact.fullName.toLowerCase().includes(searchTermLowerCase) ||
      contact.email.toLowerCase().includes(searchTermLowerCase) ||
      contact.phone.includes(searchTerm)
    );
  });

  const renderPagination = () => {
    const pageNumbers = Math.ceil(contacts.length / contactsPerPage);

    return (
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
          </li>
          {Array.from({ length: pageNumbers }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === pageNumbers ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="container">
      <h2>Contact List</h2>

      <div className="row mb-3">

      <div className="col-sm-9">
          <label htmlFor="searchTerm" className="form-label">
            Search:
          </label>
          <input
            type="text"
            id="searchTerm"
            className="form-control"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='Type to search...'
          />
        </div>

        <div className="col-sm-3">
          <label htmlFor="datepicker" className="form-label">
            Select Month/Year:
          </label>
          <input
            type="month"
            id="datepicker"
            className="form-control"
            value={selectedDate ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}` : ''}
            onChange={handleDateChange}
          />
        </div>
      </div>

      {contactStatus === "loading" && <div>Loading...</div>}
      {contactStatus === "failed" && <div>{error}</div>}
      {contactStatus === "succeeded" && (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>FullName</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Content</th>
                <th>IsAdminResponse</th>
                <th>ResponseDate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.fullName}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>
                    <button
                      className="btn btn-outline-info"
                      onClick={() => handleRespondClick(contact.id)}
                    >
                      <TbMessageReply />
                    </button>
                  </td>
                  <td>
                    <span style={{ color: contact.isAdminResponse ? "green" : "red" }}>
                      {contact.isAdminResponse ? (
                        <FaCheckSquare />
                      ) : (
                        <FaRegTimesCircle style={{ color: "red" }}/>
                      )}
                    </span>
                  </td>
                  <td>{contact.responseDate}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteClick(contact.id)}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {renderPagination()}
        </div>
      )}
    
    </div>
  );
};

export default ContactAd;
