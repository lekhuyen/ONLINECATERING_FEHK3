import { CiForkAndKnife } from "react-icons/ci";
import icons from "./icons";
import { BiSolidDrink } from "react-icons/bi";
import { FaBowlRice } from "react-icons/fa6";
import { GiChickenOven } from "react-icons/gi";


const {
    PiUsers,
    IoHomeOutline,
    IoHelpOutline,
    PiSignOutLight,
    IoInformationCircleOutline,
    RiContactsBook3Line,
    FaRegNewspaper,

    DiHackernews,
    PiLockKey, FaRegHeart, IoCalendarOutline, IoIosLogOut,

} = icons;

export const menuItems = [
    { icon: <IoHomeOutline />, title: "Dashboard", path: "/dashboard" },
    { icon: <PiUsers />, title: "Accounts", path: "/accounts" },
    { icon: <IoInformationCircleOutline />, title: "About", path: "/aboutus" },
    { icon: <RiContactsBook3Line />, title: "Contact", path: "/contactus" },
    { icon: <FaRegNewspaper />, title: "News", path: "/newsadmin" },
    { icon: <IoHelpOutline />, title: "Settings", path: "/settings" },
    { icon: <PiSignOutLight />, title: "Sign Out", path: "/signout" },
];


export const menuTab = [
    {
        id: 1,
        title: "Menu"
    },
    {
        id: 2,
        title: "Description"
    },
    {
        id: 3,
        title: "Comment"
    },
]
export const menu = [
    {
        id: 1,
        title: "Menu",
        icon: <CiForkAndKnife size="20px" />
    },
    {
        id: 2,
        title: "Appetizer",
        icon: <BiSolidDrink size="20px" />
    },
    {
        id: 3,
        title: "Main dishes",
        icon: <GiChickenOven size="20px" />
    },
    {
        id: 4,
        title: "Dessert",
        icon: <FaBowlRice size="20px" />
    },
]

export const menuUserTab = [
    {
        id: 1,
        title: "Password",
        icon: <PiLockKey />
    },
    {
        id: 2,
        title: "Favorite List",
        icon: <FaRegHeart />
    },
    {
        id: 3,
        title: "Booking History",
        icon: <IoCalendarOutline />
    },

]