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
    { icon: <IoHomeOutline />, title: "Dashboard" },
    { icon: <PiUsers />, title: "Accounts" },
    //   { icon: <IoChatboxOutline />, title: "Message" },
    { icon: <IoInformationCircleOutline />, title: "About" },
    { icon: <RiContactsBook3Line />, title: "Contact" },
    //   { icon: <TbMessage2Up />, title: "Response" },
    { icon: <FaRegNewspaper />, title: "News" },

    { icon: <IoHelpOutline />, title: "Settings" },
    { icon: <PiSignOutLight />, title: "Sign Out" },
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
        title: "Drink",
        icon: <BiSolidDrink size="20px" />
    },
    {
        id: 3,
        title: "Chicken",
        icon: <GiChickenOven size="20px" />
    },
    {
        id: 4,
        title: "Rice",
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