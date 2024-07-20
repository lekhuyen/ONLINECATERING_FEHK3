import classNames from "classnames/bind";
import styles from './Sidebar.module.scss'
import { menuItems } from "../../../ultil/menu";
import { Link } from "react-router-dom";


const cx = classNames.bind(styles)
const Sidebar = ({activeSidebar}) => {

    return (
        <div className={cx('container')}>
            <div className={cx('navigation', activeSidebar ? 'active': '')}>
                <ul>
                    {
                        menuItems.map((item, index) => (
                            <li 
                            key={index}
                            >
                                <Link>
                                    <span className={cx('icon')}>{item.icon}</span>
                                    <span className={cx('title')}>{item.title}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </div>
    );
};

export default Sidebar;