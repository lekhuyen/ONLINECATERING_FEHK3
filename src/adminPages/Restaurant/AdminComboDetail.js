import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate for routing
import { fetchComboData } from '../../redux/Restaurant/comboSlice';
import { RiArrowGoBackLine } from 'react-icons/ri';

export default function AdminComboDetail() {
  const { id } = useParams(); // Get the ID from the route parameters
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate programmatically
  const combo = useSelector((state) => state.combo.items.find((item) => item.id === parseInt(id)));
  const status = useSelector((state) => state.combo.status);
  const error = useSelector((state) => state.combo.error);

  useEffect(() => {
    if (!combo && status !== 'loading') {
      dispatch(fetchComboData());
    }
  }, [dispatch, combo, status, id]);

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <div className="container my-4">
      {combo ? (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Combo Details</h2>
            <button className="btn btn-secondary" onClick={handleGoBack}>
              <RiArrowGoBackLine /> Back
            </button>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <img src={combo.imagePath} alt={combo.name} className="img-fluid rounded" />
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
  );
}
