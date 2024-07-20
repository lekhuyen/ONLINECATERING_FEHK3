import classNames from "classnames/bind";
import styles from './Account.module.scss'
import icons from "../../ultil/icons";
import { useState } from "react";
import Slider from "../../components/Layout/Slider";
import { menuTab } from "../../ultil/menu";

const cx = classNames.bind(styles)
const { LuMapPin, FiFlag,
    IoMdTime, FaRegStar,
    FaRegUser, MdOutlineChildCare, MdAccessTime,
    FaPlus
} = icons

var imagesRestaurant = [
    {
        image: "https://heremag-prod-app-deps-s3heremagassets-bfie27mzpk03.s3.amazonaws.com/wp-content/uploads/2019/11/12180349/paris-france-le-bar-des-pres-1-560x373.jpg"
    },
    {
        image: "https://www.arshinagar.org/images/foodImg.jpg"
    },
    {
        image: "https://www.shessmokin.com/media/gallery/gallery-img-03.jpg"
    },
    {
        image: "https://c8.alamy.com/comp/2H8BEAT/dham-traditional-food-of-himachal-pradesh-himachali-kangri-dham-thali-includes-kaddu-ka-khatta-chane-ka-madra-sepu-vadi-maash-dal-rajma-salad-2H8BEAT.jpg"
    },
    {
        image: "https://axwwgrkdco.cloudimg.io/v7/lefooding.com/medias/2021/07/10_54_37_175_restaurant_le_pantruche_paris.jpg?width=800&optipress=3"
    },
    {
        image: "https://c8.alamy.com/comp/2H8BEAT/dham-traditional-food-of-himachal-pradesh-himachali-kangri-dham-thali-includes-kaddu-ka-khatta-chane-ka-madra-sepu-vadi-maash-dal-rajma-salad-2H8BEAT.jpg"
    },
    {
        image: "https://m.theweekendedition.com.au/wp-content/uploads/2022/10/TWE-Mr-Badgers-06-1100x550-c-center-616x338-c-center.png"
    },
    {
        image: "https://www.shessmokin.com/media/gallery/gallery-img-05.jpg"
    }
]

const Account = () => {
    const [active, setActive] = useState(0)
    const [activeTabMenu, setActiveTabMenu] = useState(1)
    const [imageSrc, setImageSrc] = useState('')
    const [imageIndex, setImageIndex] = useState(0)
    const [clickImageStatus, setClickImageStatus] = useState(false)

    const mainImagesCount = imagesRestaurant.length - 6
    const hanldeChangeImage = (index) => {
        setImageSrc(imagesRestaurant[index].image)
        setImageIndex(index)
        setActive(index)
    }
    let lengthItems = imagesRestaurant.length - 1;

    const handleOnClickNext = () => {
        if (active + 1 > lengthItems) {
            setActive(0)
            setImageIndex(0)
        } else {
            setActive(prev => (prev + 1))
            setImageIndex(active + 1)
        }
        setClickImageStatus(false)
    }
    // console.log(active);

    const handleOnClickPrev = () => {
        if (active - 1 < 0) {
            setActive(lengthItems)
            setImageIndex(lengthItems)
        } else {
            setActive(prev => (prev - 1))
            setImageIndex(active - 1)
        }
        setClickImageStatus(false)
    }
    const handleOnclickDot = (index) => {
        setActive(index)
    }

    return (
        <div className={cx("account-page")}>
            <div className={cx("container")}>
                <div className={cx("row")}>
                    <div className={cx("slider")}>
                        <Slider
                            handleOnclickDot={handleOnclickDot}
                            handleOnClickPrev={handleOnClickPrev}
                            slideImages={imagesRestaurant}
                            active={active}
                            handleOnClickNext={handleOnClickNext}
                            imageSrc={imageSrc}
                            clickImageStatus={clickImageStatus}
                        />
                    </div>
                    <div className={cx("images-list")}>
                        {
                            imagesRestaurant.slice(0, 5).map((item, index) => (
                                <div
                                    onClick={() => {
                                        hanldeChangeImage(index)
                                        setClickImageStatus(true)
                                    }}
                                    key={index}
                                    className={cx("image")}>
                                    <img alt="" src={item.image} className={cx(imageIndex === index ? "active" : "")} />
                                </div>
                            ))
                        }
                        {
                            mainImagesCount > 0 &&
                            <div className={cx("image", "see-all-image", imageIndex >= 5 ? "active" : "")}>
                                <img alt="" src={imagesRestaurant[6].image} />
                                <div className={cx("all-images")}>
                                    <p>+{mainImagesCount}</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className={cx("container-res-info")}>
                    <div>
                        <div className={cx("restaurant-info")}>
                            <h2>
                                Tiệm bánh ăn không ngon
                            </h2>
                            <div>
                                <span><LuMapPin /></span>
                                123 truong chinh, p12, Q.Tan Binh
                            </div>
                            <div>
                                <span><FiFlag /></span>
                                Loai hinh: <p style={{ color: "#d02028" }}>Mon Han Guoc</p>
                            </div>
                            <div>
                                <span><IoMdTime /></span>
                                Gio hoat dong: 10:00 - 20:00
                            </div>
                            <div className={cx("vote")}>
                                Danh gia:
                                <div>
                                    <span><FaRegStar /></span>
                                    <span><FaRegStar /></span>
                                    <span><FaRegStar /></span>
                                    <span><FaRegStar /></span>
                                    <span><FaRegStar /></span>
                                </div>
                            </div>
                        </div>

                        <div className={cx("menu-tab")}>
                            {
                                menuTab.map((item, index) => (
                                    <div
                                        onClick={() => setActiveTabMenu(item.id)}
                                        key={index}
                                        className={cx(activeTabMenu === item.id ? "active-tab" : "")}>
                                        <span>{item.title}</span>
                                    </div>
                                ))
                            }
                        </div>

                        <div className={cx("container-description")}>
                            {
                                activeTabMenu === 1 &&
                                <>
                                    <div className={cx("item-restaurant")}>
                                        <div className={cx("item-restaurant-info")}>
                                            <div className={cx("item-restaurant-img")}>
                                                <img alt="" src="https://heremag-prod-app-deps-s3heremagassets-bfie27mzpk03.s3.amazonaws.com/wp-content/uploads/2019/11/12180349/paris-france-le-bar-des-pres-1-560x373.jpg" />
                                            </div>
                                            <div className={cx("item-restaurant-name")}>
                                                <span>Tra chanh xanh la xa lanh</span>
                                                <p>Tra, duong</p>
                                            </div>
                                        </div>
                                        <div className={cx("item-restaurant-more")}>
                                            <p>100K</p>
                                            <div><button><FaPlus /></button></div>
                                        </div>
                                    </div>
                                    <div className={cx("item-restaurant")}>
                                        <div className={cx("item-restaurant-info")}>
                                            <div className={cx("item-restaurant-img")}>
                                                <img alt="" src="https://heremag-prod-app-deps-s3heremagassets-bfie27mzpk03.s3.amazonaws.com/wp-content/uploads/2019/11/12180349/paris-france-le-bar-des-pres-1-560x373.jpg" />
                                            </div>
                                            <div className={cx("item-restaurant-name")}>
                                                <span>Tra chanh xanh la xa lanh</span>
                                                <p>Tra, duong</p>
                                            </div>
                                        </div>
                                        <div className={cx("item-restaurant-more")}>
                                            <p>100K</p>
                                            <div><button><FaPlus /></button></div>
                                        </div>
                                    </div>
                                    <div className={cx("item-restaurant")}>
                                        <div className={cx("item-restaurant-info")}>
                                            <div className={cx("item-restaurant-img")}>
                                                <img alt="" src="https://heremag-prod-app-deps-s3heremagassets-bfie27mzpk03.s3.amazonaws.com/wp-content/uploads/2019/11/12180349/paris-france-le-bar-des-pres-1-560x373.jpg" />
                                            </div>
                                            <div className={cx("item-restaurant-name")}>
                                                <span>Tra chanh xanh la xa lanh</span>
                                                <p>Tra, duong</p>
                                            </div>
                                        </div>
                                        <div className={cx("item-restaurant-more")}>
                                            <p>100K</p>
                                            <div><button><FaPlus /></button></div>
                                        </div>
                                    </div>
                                    <div className={cx("item-restaurant")}>
                                        <div className={cx("item-restaurant-info")}>
                                            <div className={cx("item-restaurant-img")}>
                                                <img alt="" src="https://heremag-prod-app-deps-s3heremagassets-bfie27mzpk03.s3.amazonaws.com/wp-content/uploads/2019/11/12180349/paris-france-le-bar-des-pres-1-560x373.jpg" />
                                            </div>
                                            <div className={cx("item-restaurant-name")}>
                                                <span>Tra chanh xanh la xa lanh</span>
                                                <p>Tra, duong</p>
                                            </div>
                                        </div>
                                        <div className={cx("item-restaurant-more")}>
                                            <p>100K</p>
                                            <div><button><FaPlus /></button></div>
                                        </div>
                                    </div>
                                    <div className={cx("item-restaurant")}>
                                        <div className={cx("item-restaurant-info")}>
                                            <div className={cx("item-restaurant-img")}>
                                                <img alt="" src="https://heremag-prod-app-deps-s3heremagassets-bfie27mzpk03.s3.amazonaws.com/wp-content/uploads/2019/11/12180349/paris-france-le-bar-des-pres-1-560x373.jpg" />
                                            </div>
                                            <div className={cx("item-restaurant-name")}>
                                                <span>Tra chanh xanh la xa lanh</span>
                                                <p>Tra, duong</p>
                                            </div>
                                        </div>
                                        <div className={cx("item-restaurant-more")}>
                                            <p>100K</p>
                                            <div><button><FaPlus /></button></div>
                                        </div>
                                    </div>
                                </>
                            }
                            {
                                activeTabMenu === 2 &&
                                <div className={cx("content-sumary")}>
                                    <h2>Tóm tắt Wrap & Roll - MPlaza</h2>
                                    <p>PHÙ HỢP:</p>
                                    <p>Gặp mặt, tụ họp, liên hoan, đặt tiệc, tiếp khách, tiệc gia đình</p>
                                    <p>Gặp mặt, tụ họp, liên hoan, đặt tiệc, tiếp khách, tiệc gia đình</p>
                                    <p>Gặp mặt, tụ họp, liên hoan, đặt tiệc, tiếp khách, tiệc gia đình</p>
                                    <p>Gặp mặt, tụ họp, liên hoan, đặt tiệc, tiếp khách, tiệc gia đình</p>
                                    <p>Gặp mặt, tụ họp, liên hoan, đặt tiệc, tiếp khách, tiệc gia đình</p>
                                    <p>Gặp mặt, tụ họp, liên hoan, đặt tiệc, tiếp khách, tiệc gia đình</p>
                                    <p>Gặp mặt, tụ họp, liên hoan, đặt tiệc, tiếp khách, tiệc gia đình</p>
                                    <p>Gặp mặt, tụ họp, liên hoan, đặt tiệc, tiếp khách, tiệc gia đình</p>
                                </div>
                            }
                            {
                                activeTabMenu === 3 &&
                                <div className={cx("comment-container")}>
                                    <div className={cx("comment-header")}><h2>Comments</h2></div>
                                    <div style={{ marginBottom: "30px" }}>
                                        {/* comment------------- */}

                                        <div className={cx("comment-content")}>
                                            <div className={cx("comment-avatar-user")}>
                                                <img alt="" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
                                            </div>
                                            <div className={cx("comment-content-user")}>
                                                <span>David Beb</span>
                                                <p>123 abc xyz</p>
                                            </div>
                                            <div className={cx("reply-comment")}>
                                                <p>Reply</p>
                                            </div>
                                        </div>
                                        {/* reply */}
                                        <div className={cx("comment-reply")}>
                                            <div className={cx("comment-avatar-user")}>
                                                <img alt="" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
                                            </div>
                                            <div className={cx("comment-content-user")}>
                                                <span>David Beb</span>
                                                <p>123 abc xyz</p>
                                            </div>
                                        </div>
                                        <div className={cx("comment-content")}>
                                            <div className={cx("comment-avatar-user")}>
                                                <img alt="" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
                                            </div>
                                            <div className={cx("comment-content-user")}>
                                                <span>David Beb</span>
                                                <p>123 abc xyz</p>
                                            </div>
                                            <div className={cx("reply-comment")}>
                                                <p>Reply</p>
                                            </div>
                                        </div>
                                        {/* reply */}
                                        <div className={cx("comment-reply")}>
                                            <div className={cx("comment-avatar-user")}>
                                                <img alt="" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
                                            </div>
                                            <div className={cx("comment-content-user")}>
                                                <span>David Beb</span>
                                                <p>123 abc xyz</p>
                                            </div>
                                        </div>
                                        <div className={cx("comment-content")}>
                                            <div className={cx("comment-avatar-user")}>
                                                <img alt="" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
                                            </div>
                                            <div className={cx("comment-content-user")}>
                                                <span>David Beb</span>
                                                <p>123 abc xyz</p>
                                            </div>
                                            <div className={cx("reply-comment")}>
                                                <p>Reply</p>
                                            </div>
                                        </div>
                                        {/* reply */}
                                        <div className={cx("comment-reply")}>
                                            <div className={cx("comment-avatar-user")}>
                                                <img alt="" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
                                            </div>
                                            <div className={cx("comment-content-user")}>
                                                <span>David Beb</span>
                                                <p>123 abc xyz</p>
                                            </div>
                                        </div>
                                        <div className={cx("comment-content")}>
                                            <div className={cx("comment-avatar-user")}>
                                                <img alt="" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
                                            </div>
                                            <div className={cx("comment-content-user")}>
                                                <span>David Beb</span>
                                                <p>123 abc xyz</p>
                                            </div>
                                            <div className={cx("reply-comment")}>
                                                <p>Reply</p>
                                            </div>
                                        </div>

                                        {/* ------------------- */}
                                    </div>
                                    <div className={cx("comment-content-input")}>
                                        <div className={cx("comment-input")}>
                                            <textarea placeholder="Comment.." />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={cx("order-form")}>
                        <h2>Dat cho giu ban</h2>
                        <div className={cx("form")}>
                            <div className={cx("older")}>
                                <p><FaRegUser /><span>Nguoi lon</span></p>
                                <select className={cx("form-select")}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>
                            <div className={cx("time-order")}>
                                <p><MdOutlineChildCare /><span>Tre em</span></p>
                                <select className={cx("form-select")}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>
                        </div>
                        <div className={cx("form")}>
                            <div className={cx("time")}>
                                <div>
                                    <p><MdAccessTime /><span>Thoi gian den</span></p>
                                </div>
                                <input type="date" />
                            </div>
                            <div className={cx("time")}>
                                <p><MdAccessTime /><span>Gio den</span></p>
                                <input type="time" />
                            </div>
                        </div>
                        <button className={cx("order-now")}>Dat cho ngay</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;