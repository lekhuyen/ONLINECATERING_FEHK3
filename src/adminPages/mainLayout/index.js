import Header from "../mainLayout/Header";
import Sidebar from "../mainLayout/Sidebar";
import classNames from "classnames/bind";
import styles from './MainLayout.module.scss'
import { useState } from "react";

const cx = classNames.bind(styles)

const MainLayout = ({children}) => {
    const [activeSidebar, setActiveSidebar,] = useState(false)

    const handleToggleSidebar = () => {
        setActiveSidebar(prev => !prev)
    }

    return (
        <div>
            <Sidebar activeSidebar={activeSidebar}/>
            <div className={cx('wapper',  activeSidebar ? 'active': '')}>
                <div>
                    <Header 
                    activeSidebar={activeSidebar}
                    handleToggleSidebar={handleToggleSidebar}/>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;