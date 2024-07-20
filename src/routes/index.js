import Home from "../clientPages/Home"
import About from "../clientPages/About"
import Login from "../clientPages/Login"
import DashBoard from "../adminPages/Dashboard"
import UserManager from "../adminPages/UserManager"
import ProductManager from "../adminPages/ProductManager"
import Contact from "../clientPages/ContactUs"
import News from "../clientPages/News"
import Account from "../clientPages/Account"
import AboutUs from "../adminPages/Information/AboutUs"
import NewsAd from "../adminPages/Information/NewsAd"
import ContactAd from "../adminPages/Information/ContactAd"
import Menu from "../clientPages/Menu"
import ResponseMessage from "../adminPages/Information/ResponseMessage"
import CreateAboutUs from "../adminPages/Information/CreateAboutUs"
import CreateNews from "../adminPages/Information/CreateNews"
import EditAboutUs from "../adminPages/Information/EditAboutUs"
import EditNews from "../adminPages/Information/EditNews"

const publicRoutes = [
    {path: "/", component: Home},
    {path: "/about", component: About},
    {path: "/login", component: Login, layout: null},
    {path: "/contact", component: Contact},
    {path: "/news", component: News},
    {path: "/account", component: Account},
    {path: "/menu", component: Menu},
]

const privateRoutes = [
    {path: "/dashboard", component: DashBoard},
    {path: "/aboutus", component: AboutUs},
    {path: "/aboutus/create-aboutus", component: CreateAboutUs},
    {path: "/aboutus/edit-aboutus/:id", component: EditAboutUs},
    {path: "/newsadmin", component: NewsAd},
    {path: "/newsadmin/create-news", component: CreateNews},
    {path: "/newsadmin/edit-news/:id", component: EditNews},
    {path: "/contactus", component: ContactAd},
    {path: "/contactus/responsemessage/:id", component: ResponseMessage},
    {path: "/user-manager", component: UserManager},
    {path: "/product-manager", component: ProductManager},
]

export {publicRoutes, privateRoutes} 