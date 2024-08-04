import styles from './OrderCombo.module.scss'
import clsx from 'clsx';
import { useEffect, useState } from 'react';
// import { FaCartPlus } from 'react-icons/fa';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { apiGetAllCombo } from '../../apis/combo';


const OrderCombo = () => {
    const navigate = useNavigate()
    const [combos, setCombos] = useState([])

    const getAllCombo = async () => {
        const response = await apiGetAllCombo()
        if (response.status === 0) {
            setCombos(response.data.$values)
        }
    }
    useEffect(() => {
        getAllCombo()
    }, [])
    
    return (
        <div className={clsx(styles.container, 'app__bg')}>
            <div className={styles.title}>
                <div className={styles.title_more}><h1>Combo Menu</h1></div>
            </div>
            <div className={styles.wapper}>
                <div className={styles.menu_container}>
                    {
                        combos?.length > 0 && combos?.map(item => (
                            <div key={item.id} className={clsx(styles.menu_item)}>
                                <div className={styles.table_title}>
                                    <h5>{item.name}</h5>
                                </div>
                                <div className={styles.menu_more}>
                                    <div><img alt="" src={item.imagePath} /></div>
                                </div>
                                <div className={styles.table_description}>
                                    <span>Tender calamari rings lightly breaded and fried to perfection, served with a zesty marinara dipping sauce</span>
                                </div>
                                <div className={styles.menu_price}>
                                    <p><RiMoneyDollarCircleLine />{item.price}</p>
                                </div>
                                <div className={styles.detail_title}>
                                    <button onClick={() => navigate(`/menu-combo/${item.id}`)}>Detail</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default OrderCombo;