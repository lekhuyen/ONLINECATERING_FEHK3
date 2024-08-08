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
  LiaCommentDotsSolid,
  PiLockKey,
  FaRegHeart,
  IoCalendarOutline,
  FaBullhorn,
} = icons;

export const menuItems = [
  { icon: <IoHomeOutline />, title: "OnlineCatering.in", path: "/dashboard" },
  { icon: <MdMonitor />, title: "Dashboard", path: "/dashboard" },
  { icon: <PiUsers />, title: "Account", path: "/admin-accounts" },
  { icon: <IoInformationCircleOutline />, title: "About", path: "/aboutus" },
  { icon: <LiaCommentDotsSolid />, title: "Comment", path: "/comment-admin" },
  { icon: <IoMdGift />, title: "Promotion", path: "/promotion" },
  { icon: <TfiLayersAlt />, title: "Order", path: "/order-admin" },
  { icon: <CiForkAndKnife />, title: "Appetizer", path: "/appetizer-admin" },
  { icon: <GiChickenOven />, title: "Dish", path: "/dish-admin" },
  { icon: <GiCupcake />, title: "Dessert", path: "/dessert-admin" },
  { icon: <CiForkAndKnife />, title: "Combo", path: "/combo-admin" },
  { icon: <RiContactsBook3Line />, title: "Contact", path: "/contactus" },
  { icon: <FaRegNewspaper />, title: "News", path: "/newsadmin" },
  { icon: <TiImage />, title: "Lobby", path: "/lobby-admin" },
  // { icon: <MdOutlinePayment />, title: "Payment", path: "/payment-admin" },
  // { icon: <TfiLayersAlt />, title: "Service", path: "/service" },  
  //{ icon: <TbBrandBooking />, title: "Order", path: "/booking-admin" },
  // { icon: <BiDish />, title: "Menu Management", path: "/menu-admin" },

  // {
  //   icon: <RiCustomerService2Line />,
  //   title: "Service",
  //   path: "/service",
  // },
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
export const voteOption = [
    
  {
      id: 1,
      text: 'Terrible'
  },
  {
      id: 2,
      text: 'Bad'
  },
  {
      id: 3,
      text: 'Neutral'
  },
  {
      id: 4,
      text: 'Good'
  },
  {
      id: 5,
      text: 'Perfect'
  },
  
]

export const timeOrder = [
  {
    id: 1,
    title: '08:00',
    to: '12:00',
  },
  {
    id: 2,
    title: '13:00',
    to: '17:00',
  },
  {
    id: 3,
    title: '18:00',
    to: '22:00',
  },
]