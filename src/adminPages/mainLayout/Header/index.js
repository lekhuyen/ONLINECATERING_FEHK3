import classNames from "classnames/bind";
import styles from './Header.module.scss'
import icons from "../../../ultil/icons";

const cx = classNames.bind(styles)

const {IoMenu, IoIosSearch} = icons

const Header = ({handleToggleSidebar}) => {
    return (
        <div className={cx('main', 'active')}>
                <div className={cx('topbar')}>
                    <div 
                    onClick={handleToggleSidebar}
                    className={cx('toggle')}>
                        <IoMenu />
                    </div>
                    <div className={cx('search')}>
                        <label>
                            <input type="text" placeholder="Search here" />
                            <span><IoIosSearch /></span>
                        </label>
                    </div>
                    <div className={cx('user')}>
                        <img alt="avatar" src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"/>
                    </div>
                </div>
            </div>
    );
};

export default Header;