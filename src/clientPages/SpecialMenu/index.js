import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { images } from '../../constants'; // Ensure data is imported
import MenuItem from '../MenuItem';
import SubHeading from '../../components/Layout/DefaultLayout/SubHeading/Index';
import './SpecialMenu.css';
import { fetchAppetizerData } from '../../redux/Restaurant/adminappetizersSlice';
import { fetchDessertData } from '../../redux/Restaurant/admindessertSlice';



const SpecialMenu = () => {
  const dispatch = useDispatch();
  const wines = useSelector((state) => state.adminappetizer.items.slice(0, 5) || []); // Limit to 5 items
  const cocktails = useSelector((state) => state.admindessert.items.slice(0, 5) || []); // Cocktails from Redux state
  const status = useSelector((state) => state.adminappetizer.status);
  const error = useSelector((state) => state.adminappetizer.error);

  useEffect(() => {
    dispatch(fetchAppetizerData());
    dispatch(fetchDessertData());

  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Handle loading state
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>; // Handle error state
  }

  return (
    <div className="app__specialMenu flex__center section__padding" id="menu">
      <div className="app__specialMenu-title">
        <SubHeading title="Menu that fits your palette" />
        <h1 className="headtext__cormorant">Today's Special</h1>
      </div>

      <div className="app__specialMenu-menu">
        <div className="app__specialMenu-menu_wine flex__center">
          <p className="app__specialMenu-menu_heading">Appetizer</p>
          <div className="app__specialMenu_menu_items">
            {wines.map((wine) => (
              <MenuItem
                key={wine.id}
                title={wine.appetizerName} // Use appetizerName instead of AppetizerName if that's the correct case
                price={`$${wine.price}`} // Format price with a dollar sign
                tags={wine.tags} // Adjust according to your data structure
              />
            ))}
          </div>
        </div>

        <div className="app__specialMenu-menu_img">
          <img src={images.menu} alt="menu__img" />
        </div>

        <div className="app__specialMenu-menu_cocktails flex__center">
          <p className="app__specialMenu-menu_heading">Dessert</p>
          <div className="app__specialMenu_menu_items">
            {cocktails.map((cocktail) => (
              <MenuItem
                key={cocktail.id}
                title={cocktail.dessertName}
                price={`$${cocktail.price}`} // Format price with a dollar sign
                tags={cocktail.tags} // Adjust according to your data structure
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 15 }}>
        <button type="button" className="custom__button">
          View More
        </button>
      </div>
    </div>
  );
};

export default SpecialMenu;
