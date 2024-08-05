import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchComboData } from '../../redux/Restaurant/comboSlice';
import { fetchAdminComboAppetizerData, deleteAdminComboAppetizer, createAdminComboAppetizer } from '../../redux/Restaurant/admincomboappetizerSlice';
import { fetchAdminComboDessertData, deleteAdminComboDessert, createAdminComboDessert } from '../../redux/Restaurant/admincombodessertSlice';
import { fetchAdminComboDishData, deleteAdminComboDish, createAdminComboDish } from '../../redux/Restaurant/admincombodishSlice';
import { FaRegTrashAlt } from 'react-icons/fa';
import styles from './AdminComboDetail.module.scss';
import AppetizerModal from './AppetizerModal';
import DessertModal from './DessertModal';
import DishModal from './DishModal';
import { RiArrowGoBackLine } from 'react-icons/ri';

export default function AdminComboDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalType, setModalType] = useState('');
  const [selectedAppetizer, setSelectedAppetizer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetching Combo Data
  const combo = useSelector((state) => state.combo.items.find((item) => item.id === parseInt(id)));
  const comboStatus = useSelector((state) => state.combo.status);
  const comboError = useSelector((state) => state.combo.error);

  // Fetching Appetizers Data
  const adminComboAppetizers = useSelector((state) => state.adminComboAppetizer.adminComboAppetizers || []);
  const appStatus = useSelector((state) => state.adminComboAppetizer.status);
  const appError = useSelector((state) => state.adminComboAppetizer.error);

  // Fetching Desserts Data
  const adminComboDesserts = useSelector((state) => state.adminComboDessert.adminComboDesserts || []);
  const dessertStatus = useSelector((state) => state.adminComboDessert.status);
  const dessertError = useSelector((state) => state.adminComboDessert.error);

  // Fetching Dishes Data
  const adminComboDishes = useSelector((state) => state.adminComboDish.adminComboDishes || []);
  const dishStatus = useSelector((state) => state.adminComboDish.status);
  const dishError = useSelector((state) => state.adminComboDish.error);

  useEffect(() => {
    if (!combo && comboStatus !== 'loading') {
      dispatch(fetchComboData());
    }
    dispatch(fetchAdminComboAppetizerData());
    dispatch(fetchAdminComboDessertData());
    dispatch(fetchAdminComboDishData());
  }, [dispatch, combo, comboStatus, id]);

  // Debugging Logs
  useEffect(() => {
    console.log('Admin Combo Appetizers:', adminComboAppetizers);
    
  }, [adminComboAppetizers]);
  useEffect(() => {
    console.log('Admin Combo Dishes:', adminComboDishes);
  }, [adminComboDishes]);

  useEffect(() => {
    const someId = 1; // Use the correct logic to get this ID
    const selectedAppetizer = adminComboAppetizers.find(app => app.id === someId);
    console.log('Selected Appetizer:', selectedAppetizer);
  }, [adminComboAppetizers]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCreateAppetizer = () => {
    setModalType('appetizer');
    setIsModalOpen(true);
  };

  const handleCreateDessert = () => {
    setModalType('dessert');
    setIsModalOpen(true);
  };

  const handleCreateDish = () => {
    setModalType('dish');
    setIsModalOpen(true);
  };

  const handleDeleteAppetizer = (comboAppetizerId) => {
    if (window.confirm('Are you sure you want to delete this appetizer?')) {
      dispatch(deleteAdminComboAppetizer(comboAppetizerId));
    }
  };

  const handleDeleteDessert = (comboDessertId) => {
    if (window.confirm('Are you sure you want to delete this dessert?')) {
      dispatch(deleteAdminComboDessert(comboDessertId));
    }
  };

  const handleDeleteDish = (comboDishId) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      dispatch(deleteAdminComboDish(comboDishId));
    }
  };

  const handleSelectAppetizer = (appetizer) => {
    dispatch(createAdminComboAppetizer({ comboId: parseInt(id), appetizerId: appetizer.id }));
    setIsModalOpen(false);
  };

  const handleSelectDessert = (dessert) => {
    dispatch(createAdminComboDessert({ comboId: parseInt(id), dessertId: dessert.id }));
    setIsModalOpen(false);
  };

  if (comboStatus === 'loading' || appStatus === 'loading' || dessertStatus === 'loading' || dishStatus === 'loading') return <p>Loading...</p>;
  if (comboStatus === 'failed') return <p>{comboError}</p>;
  if (appStatus === 'failed') return <p>{appError}</p>;
  if (dessertStatus === 'failed') return <p>{dessertError}</p>;
  if (dishStatus === 'failed') return <p>{dishError}</p>;

  const relatedAppetizers = adminComboAppetizers.filter(app => app.comboId === parseInt(id));
  const relatedDesserts = adminComboDesserts.filter(dessert => dessert.comboId === parseInt(id));
  const relatedDishes = adminComboDishes.filter(dish => dish.comboId === parseInt(id));

  return (
    <div className={styles.container}>
      <div>
        {combo ? (
          <div>
            <div className={styles.header}>
              <h2>Combo Details</h2>
              <button className={styles.goBackButton} onClick={handleGoBack}>
                <RiArrowGoBackLine /> Back
              </button>
            </div>
            <div className={styles.card}>
              <div className={styles.cardBody}>
                <div className={styles.row}>
                  <div className={styles.detailsContainer}>
                    <img src={combo.imagePath} alt={combo.name} className={styles.imgThumbnail} />
                  </div>
                  <div className={styles.detailsTable}>
                    <table className={styles.table}>
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

      <div className={styles.contentContainer}>
        <div className={styles.row}>
          {/* Appetizers Table */}
          <div className={styles.column}>
            <div className={styles.sectionHeader}>
              <h3>Appetizers</h3>
              <button className={styles.createButton} onClick={handleCreateAppetizer}>
                Create
              </button>
            </div>
            {relatedAppetizers.length > 0 ? (
              <ul className={styles.listGroup}>
                {relatedAppetizers.map((app, index) => (
                  <li
                    key={app.comboAppetizerId}
                    className={`${styles.listGroupItem} ${index % 2 === 0 ? styles.even : styles.odd}`}
                  >
                    <div className={styles.detailsContainer}>
                      <div className={styles.detailsImage}>
                        <img src={app.appetizerImage} alt={app.appetizerName} className={styles.imgThumbnail} />
                      </div>
                      <div className={styles.detailsInfo}>
                        <div className={styles.row}>
                          <div className={styles.col}>
                            <p><strong>Id:</strong> {app.appetizerId}</p>
                            <p><strong>Name:</strong> {app.appetizerName}</p>
                            <p><strong>Price:</strong> ${app.appetizerPrice}</p>
                            <p><strong>Quantity:</strong> {app.appetizerQuantity}</p>
                          </div>
                          <div className={styles.deleteButtonContainer}>
                            <button
                              className={styles.deleteButton}
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

          {/* Desserts Table */}
          <div className={styles.column}>
            <div className={styles.sectionHeader}>
              <h3>Desserts</h3>
              <button className={styles.createButton} onClick={handleCreateDessert}>
                Create
              </button>
            </div>
            {relatedDesserts.length > 0 ? (
              <ul className={styles.listGroup}>
                {relatedDesserts.map((dessert, index) => (
                  <li
                    key={dessert.comboDessertId}
                    className={`${styles.listGroupItem} ${index % 2 === 0 ? styles.even : styles.odd}`}
                  >
                    <div className={styles.detailsContainer}>
                      <div className={styles.detailsImage}>
                        <img src={dessert.dessertImage} alt={dessert.dessertName} className={styles.imgThumbnail} />
                      </div>
                      <div className={styles.detailsInfo}>
                        <div className={styles.row}>
                          <div className={styles.col}>
                            <p><strong>Id:</strong> {dessert.dessertId}</p>
                            <p><strong>Name:</strong> {dessert.dessertName}</p>
                            <p><strong>Price:</strong> ${dessert.dessertPrice}</p>
                            <p><strong>Quantity:</strong> {dessert.dessertQuantity}</p>
                          </div>
                          <div className={styles.deleteButtonContainer}>
                            <button
                              className={styles.deleteButton}
                              onClick={() => handleDeleteDessert(dessert.comboDessertId)}
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
              <p>No desserts found for this combo.</p>
            )}
          </div>

          {/* Dishes Table */}
          <div className={styles.column}>
            <div className={styles.sectionHeader}>
              <h3>Dishes</h3>
              <button className={styles.createButton} onClick={handleCreateDish}>
                Create
              </button>
            </div>
            {relatedDishes.length > 0 ? (
              <ul className={styles.listGroup}>
                {relatedDishes.map((dish, index) => (
                  <li
                    key={dish.comboDishId}
                    className={`${styles.listGroupItem} ${index % 2 === 0 ? styles.even : styles.odd}`}
                  >
                    <div className={styles.detailsContainer}>
                      <div className={styles.detailsImage}>
                        <img src={dish.dishImagePath} alt={dish.dishName} className={styles.imgThumbnail} />
                      </div>
                      <div className={styles.detailsInfo}>
                        <div className={styles.row}>
                          <div className={styles.col}>
                            <p><strong>Id:</strong> {dish.dishId}</p>
                            <p><strong>Name:</strong> {dish.dishName}</p>
                            <p><strong>Price:</strong> ${dish.dishPrice}</p>
                            <p><strong>Quantity:</strong> {dish.dishQuantity}</p>
                          </div>
                          <div className={styles.deleteButtonContainer}>
                            <button
                              className={styles.deleteButton}
                              onClick={() => handleDeleteDish(dish.comboDishId)}
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
              <p>No dishes found for this combo.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal Section */}
      {modalType === 'appetizer' && (
        <AppetizerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelectAppetizer={handleSelectAppetizer}
          comboId={parseInt(id)}
        />
      )}
      {modalType === 'dessert' && (
        <DessertModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelectDessert={handleSelectDessert}
          comboId={parseInt(id)}
        />
      )}

      {modalType === 'dish' && (
        <DishModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelectDish={handleCreateDish}
          comboId={parseInt(id)}
        />
      )}

    </div>
  );
}
