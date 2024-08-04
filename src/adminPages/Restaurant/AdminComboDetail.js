import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchComboData } from '../../redux/Restaurant/comboSlice';
import { fetchAdminComboAppetizerData, deleteAdminComboAppetizer, createAdminComboAppetizer } from '../../redux/Restaurant/admincomboappetizerSlice';
import { fetchAdminComboDessertData, deleteAdminComboDessert, createAdminComboDessert } from '../../redux/Restaurant/admincombodessertSlice';
import { fetchAdminComboDishData, deleteAdminComboDish, createComboDish } from '../../redux/Restaurant/admincombodishSlice';
import { FaRegTrashAlt } from 'react-icons/fa';
import styles from './AdminComboDetail.module.scss';
import AppetizerModal from './AppetizerModal';
import DessertModal from './DessertModal'; // Import DessertModal
import { RiArrowGoBackLine } from 'react-icons/ri';

export default function AdminComboDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalType, setModalType] = useState('');
  const [selectedAppetizer, setSelectedAppetizer] = useState(null);
  const [selectedDessert, setSelectedDessert] = useState(null);
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
                    <img src={combo.imagePath} alt={combo.name} className={styles.image} />
                    <h3 className={styles.name}>{combo.name}</h3>
                    <p className={styles.description}>{combo.description}</p>
                    <p className={styles.price}>${combo.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className={styles.buttons}>
                <button className={styles.addButton} onClick={handleCreateAppetizer}>Add Appetizer</button>
                <button className={styles.addButton} onClick={handleCreateDessert}>Add Dessert</button>
                <button className={styles.addButton} onClick={handleCreateDish}>Add Dish</button>
              </div>
              <div className={styles.tableContainer}>
                <h3>Appetizers</h3>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relatedAppetizers.map(appetizer => (
                      <tr key={appetizer.id}>
                        <td>{appetizer.appetizerName}</td>
                        <td>${appetizer.price.toFixed(2)}</td>
                        <td>{appetizer.quantity}</td>
                        <td>
                          <button className={styles.deleteButton} onClick={() => handleDeleteAppetizer(appetizer.id)}>
                            <FaRegTrashAlt /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h3>Desserts</h3>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relatedDesserts.map(dessert => (
                      <tr key={dessert.id}>
                        <td>{dessert.dessertName}</td>
                        <td>${dessert.price.toFixed(2)}</td>
                        <td>{dessert.quantity}</td>
                        <td>
                          <button className={styles.deleteButton} onClick={() => handleDeleteDessert(dessert.id)}>
                            <FaRegTrashAlt /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h3>Dishes</h3>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relatedDishes.map(dish => (
                      <tr key={dish.id}>
                        <td>{dish.dishName}</td>
                        <td>${dish.price.toFixed(2)}</td>
                        <td>{dish.quantity}</td>
                        <td>
                          <button className={styles.deleteButton} onClick={() => handleDeleteDish(dish.id)}>
                            <FaRegTrashAlt /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <p>Combo not found</p>
        )}
      </div>

      {/* Render modals */}
      <AppetizerModal isOpen={isModalOpen && modalType === 'appetizer'} comboId={id} onClose={() => setIsModalOpen(false)} />
      <DessertModal isOpen={isModalOpen && modalType === 'dessert'} comboId={id} onClose={() => setIsModalOpen(false)} />
      {/* Add Dish Modal */}
    </div>
  );
}
