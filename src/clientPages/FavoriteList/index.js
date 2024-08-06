import styles from './Favorite.module.scss'
import { images } from "../../constants/index.js";
import React from 'react';

function FavoriteList(props) {
  return (
    <div className={styles.user_favorite_all}>
      <div className={styles.user_favorite_title}>
        <h3>Your Favorite List</h3>
      </div>
      <div className={styles.user_favorite_row}>
        <div className={styles.user_favorite_left} >
          <img alt='' src={images.SurfnTurf} className={styles.user_favorite_images} />
        </div>
        <div className={styles.user_favorite_right} >
          <p>
            <span className={styles.user_favorite__right_title}>Favorite Dish: Surf & Turf</span>
          </p>
          <p>
            <span className={styles.user_favorite_text}>
              Sometimes called reef and beef, is a main course combining seafood and red meat, typically beefsteak
            </span>
          </p>
        </div>
      </div>
      <div className={styles.user_favorite_row}>
        <div className={styles.user_favorite_left} >
          <img alt='' src={images.dumaloo} className={styles.user_favorite_images} />
        </div>
        <div className={styles.user_favorite_right} >
          <p>
            <span className={styles.user_favorite__right_title}>Favorite Dish: Dum Aloo</span>
          </p>
          <p>
            <span className={styles.user_favorite_text}>
              Dum aloo or aloor dum or aloo dum is a potato-based curry dish
            </span>
          </p>
        </div>
      </div>
      <div className={styles.user_favorite_row}>
        <div className={styles.user_favorite_left} >
          <img alt="" src={images.applewalnut} className={styles.user_favorite_images} />
        </div>
        <div className={styles.user_favorite_right} >
          <p>
            <span className={styles.user_favorite__right_title}>Favorite Dish: Apple Walnut Salad</span>
          </p>
          <p>
            <span className={styles.user_favorite_text}>
            Crisp apples, toasty walnuts and creamy feta or blue cheese make this apple walnut salad ideal for holidays and parties
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FavoriteList;