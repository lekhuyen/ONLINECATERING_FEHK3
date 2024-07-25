import { CiForkAndKnife } from "react-icons/ci";
import icons from "./icons";
import { BiDish, BiSolidDrink } from "react-icons/bi";
import { FaBowlRice } from "react-icons/fa6";

import { MdMonitor, MdOutlinePayment } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { TiImage } from "react-icons/ti";
import { TbBrandBooking } from "react-icons/tb";
import { IoMdGift } from "react-icons/io";
import { TfiLayersAlt } from "react-icons/tfi";

import { GiChickenOven, GiCupcake } from "react-icons/gi";



const {
  PiUsers,
  IoHomeOutline,
  IoHelpOutline,
  PiSignOutLight,
  IoInformationCircleOutline,
  RiContactsBook3Line,
  FaRegNewspaper,

  PiLockKey,
  FaRegHeart,
  IoCalendarOutline,
  FaBullhorn,
} = icons;

export const menuItems = [
  { icon: <IoHomeOutline />, title: "OnlineCatering.in", path: "/dashboard" },
  { icon: <MdMonitor />, title: "Dashboard", path: "/dashboard" },
  { icon: <PiUsers />, title: "Accounts", path: "/admin-accounts" },
  { icon: <IoInformationCircleOutline />, title: "About", path: "/aboutus" },
  { icon: <RiContactsBook3Line />, title: "Contact", path: "/contactus" },
  { icon: <FaRegNewspaper />, title: "News", path: "/newsadmin" },
  { icon: <TiImage />, title: "Lobby", path: "/lobbyadmin" },
  { icon: <TbBrandBooking />, title: "Order", path: "/bookingadmin" },
  { icon: <BiDish />, title: "Menu Management", path: "/dishadmin" },
  { icon: <MdOutlinePayment />, title: "Payment", path: "/paymentadmin" },
  { icon: <IoMdGift />, title: "Promotion", path: "/promotion" },
  { icon: <TfiLayersAlt />, title: "Combo", path: "/comboadmin" },
  {
    icon: <RiCustomerService2Line />,
    title: "Service",
    path: "/serviceadmin",
  },
  { icon: <PiSignOutLight />, title: "Sign Out", path: "/signout" },
];

export const menuTab = [
  {
    id: 1,
    title: "Menu",
  },
  {
    id: 2,
    title: "Description",
  },
  {
    id: 3,
    title: "Comment",
  },
];
export const menu = [

    {
        id: 1,
        title: "Appetizers",
        icon: <CiForkAndKnife size="20px" />
    },
    {
        id: 2,
        title: "Main Dishes",
        icon: <GiChickenOven size="20px" />
    },
    {
        id: 3,
        title: "Desserts",
        icon: <GiCupcake size="20px" />
    },
    {
        id: 4,
        title: "Beverages",
        icon: <BiSolidDrink size="20px" />
    },
    {
        id: 5,
        title: "Promotion",
        icon: <FaBullhorn size="20px" />
    },
]
export const menuDish = [

    {
        id: 1,
        title: "Appetizers",
        icon: <CiForkAndKnife size="20px" />
    },
    {
        id: 2,
        title: "Main Dishes",
        icon: <GiChickenOven size="20px" />
    },
    {
        id: 3,
        title: "Desserts",
        icon: <GiCupcake size="20px" />
    },
    {
        id: 4,
        title: "Beverages",
        icon: <BiSolidDrink size="20px" />
    },
    
]

export const menuUserTab = [
  {
    id: 1,
    title: "Password",
    icon: <PiLockKey />,
  },
  {
    id: 2,
    title: "Favorite List",
    icon: <FaRegHeart />,
  },
  {
    id: 3,
    title: "Booking History",
    icon: <IoCalendarOutline />,
  },
];
