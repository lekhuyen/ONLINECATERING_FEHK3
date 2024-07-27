import Home from "../clientPages/Home"
import About from "../clientPages/About"
import Login from "../clientPages/Login"
import DashBoard from "../adminPages/Dashboard"
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

import Order from "../clientPages/Order"
import User from "../clientPages/User"
import EmailInput from "../clientPages/ForgotPassword/emailInput"
import Lobby from "../clientPages/Lobby"
import OrderCombo from "../clientPages/OrderCombo"
import Accounts from "../adminPages/Accounts"
import Service from "../adminPages/Restaurant/Service"
import CreateService from "../adminPages/Restaurant/CreateService"
import EditService from "../adminPages/Restaurant/EditService"
import MenuDish from "../clientPages/MenuDish"
import Promotion from "../adminPages/Restaurant/Promotion"
import AdminOrder from "../adminPages/Restaurant/AdminOrder"
import AdminCombo from "../adminPages/Restaurant/AdminCombo"
import AdminDish from "../adminPages/Restaurant/AdminDish"
import CreateDish from "../adminPages/Restaurant/CreateDish"
import EditDish from "../adminPages/Restaurant/EditDish"




const publicRoutes = [
    {path: "/", component: Home},
    {path: "/about", component: About},
    {path: "/login", component: Login, layout: null},
    {path: "/forgot-password", component: EmailInput, layout: null},
    {path: "/contact", component: Contact},
    {path: "/news", component: News},
    {path: "/account", component: Account},
    {path: "/menu-combo/:comboid", component: Menu},
    {path: "/menu/", component: MenuDish},
    {path: "/order", component: Order},
    {path: "/user", component: User},
    {path: "/lobby", component: Lobby},
    {path: "/ordercombo", component: OrderCombo},
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
    {path: "/admin-accounts", component: Accounts},
    {path: "/product-manager", component: ProductManager},
    {path: "/service", component: Service},
    {path: "/service/create-service", component: CreateService},
    {path: "/service/edit-service/:id", component: EditService},
    {path: "/promotion", component: Promotion},
    {path: "/combo-admin", component: AdminCombo},
    {path: "/order-admin", component: AdminOrder},
    {path: "/dish-admin", component: AdminDish},
    {path: "/dish-admin/create-dish-admin", component: CreateDish},
    {path: "/dish-admin/edit-dish-admin/:id", component: EditDish},

]

export {publicRoutes, privateRoutes} 