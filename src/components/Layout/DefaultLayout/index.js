// import Sidebar from './Sidebar';
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
        </div>
    );
};

export default DefaultLayout;