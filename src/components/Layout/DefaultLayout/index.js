// import Sidebar from './Sidebar';
import ChatBox from './ChatBox';
import Footer from './Footer';
import Navbar from './Navbar';

const DefaultLayout = ({children}) => {
    return (
        <div>
            <Navbar />
            <div>
                {/* <Sidebar /> */}
                <div>
                    {children}
                </div>
            </div>
            <Footer />
            <ChatBox />
        </div>
    );
};

export default DefaultLayout;