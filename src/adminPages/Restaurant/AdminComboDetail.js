import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchComboData } from '../../redux/Restaurant/comboSlice';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { fetchAdminComboAppetizerData, createAdminComboAppetizer, deleteAdminComboAppetizer } from '../../redux/Restaurant/admincomboappetizerSlice';
import styles from './AdminComboDetail.module.scss'; // Import the SCSS module
import clsx from 'clsx'; // Import clsx
import { FaRegTrashAlt } from 'react-icons/fa';

export default function AdminComboDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const combo = useSelector((state) => state.combo.items.find((item) => item.id === parseInt(id)));
  const comboStatus = useSelector((state) => state.combo.status);
  const comboError = useSelector((state) => state.combo.error);
  const adminComboAppetizers = useSelector((state) => state.adminComboAppetizer.adminComboAppetizers);
  const appStatus = useSelector((state) => state.adminComboAppetizer.status);
  const appError = useSelector((state) => state.adminComboAppetizer.error);

  useEffect(() => {
    if (!combo && comboStatus !== 'loading') {
      dispatch(fetchComboData());
    }
    dispatch(fetchAdminComboAppetizerData());
  }, [dispatch, combo, comboStatus, id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCreateAppetizer = () => {
    // Display form or modal for creating a new appetizer
    // Example:
    // dispatch(createAdminComboAppetizer({ comboId: parseInt(id), appetizerId: selectedAppetizerId }));
  };

  const handleDeleteAppetizer = (comboAppetizerId) => {
    // Confirm the deletion action
    if (window.confirm('Are you sure you want to delete this appetizer?')) {
      dispatch(deleteAdminComboAppetizer(comboAppetizerId));
    }
  };

  if (comboStatus === 'loading' || appStatus === 'loading') return <p>Loading...</p>;
  if (comboStatus === 'failed') return <p>{comboError}</p>;
  if (appStatus === 'failed') return <p>{appError}</p>;

  const relatedAppetizers = adminComboAppetizers.filter(app => app.comboId === parseInt(id));

  return (
    <div className={clsx('container', styles.container)}>
      <div>
        {combo ? (
          <div>
            <div className={clsx('d-flex', 'justify-content-between', 'align-items-center', 'mb-4', styles.card)}>
              <h2>Combo Details</h2>
              <button className="btn btn-secondary" onClick={handleGoBack}>
                <RiArrowGoBackLine /> Back
              </button>
            </div>
            <div className={clsx('card', styles.card)}>
              <div className="card-body">
                <div className="row">
                  <div className={clsx('col-md-4', styles.detailsContainer)}>
                    <img src={combo.imagePath} alt={combo.name} className={clsx('img-fluid', 'rounded', styles.imgThumbnail)} />
                  </div>
                  <div className="col-md-8">
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <th>Id</th>
                          <td>{combo.id}</td>
                        </tr>
                        <tr>
                          <th>Name</th>
                          <td>{combo.name}</td>
                        </tr>
                        <tr>
                          <th>Price</th>
                          <td>${combo.price}</td>
                        </tr>
                        <tr>
                          <th>Type</th>
                          <td>{combo.type}</td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td>{combo.status ? 'Active' : 'Inactive'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No combo item found with ID {id}</p>
        )}
      </div>

      <div>
        <div className={clsx('d-flex', 'justify-content-between', 'align-items-center', 'mb-4')}>
          <h3>Appetizers</h3>
          <button className="btn btn-primary" onClick={handleCreateAppetizer}>
            Create
          </button>
        </div>
        {relatedAppetizers.length > 0 ? (
          <ul className="list-group">
            {relatedAppetizers.map((app, index) => (
              <li
                key={app.comboAppetizerId} // Use comboAppetizerId as the unique ID
                className={clsx('list-group-item', styles.listGroupItem, {
                  [styles.even]: index % 2 === 0,
                  [styles.odd]: index % 2 !== 0,
                })}
              >
                <div className={styles.detailsContainer}>
                  <div className={styles.detailsImage}>
                    <img src={app.appetizerImage} alt={app.appetizerName} className={clsx('img-thumbnail', styles.imgThumbnail)} />
                  </div>
                  <div className={styles.detailsInfo}>
                    <div className="row">
                      <div className="col-sm-6">
                        <p><strong>Id:</strong> {app.appetizerId}</p>
                        <p><strong>Name:</strong> {app.appetizerName}</p>
                        <p><strong>Price:</strong> ${app.appetizerPrice}</p>
                        <p><strong>Quantity:</strong> {app.appetizerQuantity}</p>
                      </div>
                      <div className="col-sm-6 d-flex align-items-center justify-content-center">
                        <button
                          className={clsx("btn btn-danger", styles.deleteButton)}
                          onClick={() => handleDeleteAppetizer(app.comboAppetizerId)}
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No appetizers found for this combo.</p>
        )}
      </div>
    </div>
  );
}
