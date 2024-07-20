import icons from "./icons";

const {
  PiUsers,
  IoHomeOutline,
  IoChatboxOutline,
  IoHelpOutline,
  PiSignOutLight,
  IoInformationCircleOutline,
  RiContactsBook3Line,
  TbMessage2Up,
  FaRegNewspaper,
  DiHackernews,
} = icons;

export const menuItems = [
  { icon: <IoHomeOutline />, title: "Dashboard" },
  { icon: <PiUsers />, title: "Customer" },
  { icon: <IoChatboxOutline />, title: "Message" },
  { icon: <IoInformationCircleOutline />, title: "About" },
  { icon: <RiContactsBook3Line />, title: "Contact" },
  { icon: <TbMessage2Up />, title: "Response" },
  { icon: <FaRegNewspaper />, title: "News" },
  { icon: <DiHackernews />, title: "News Type" },
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
