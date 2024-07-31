import { useEffect, useState } from 'react';
import { voteOption } from '../../ultil/menu';
import styles from './ModalCommnent.module.scss'
import { MdOutlineStarPurple500 } from 'react-icons/md';
import classNames from 'classnames/bind';
import icons from "../../ultil/icons";
import clsx from 'clsx';
import Scrollbars from 'react-custom-scrollbars-2';
import { BsFillSendFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { apiGetAppetizerById } from '../../apis/menu';

const cx = classNames.bind(styles)
const { FaRegStar,
} = icons
const Comment = () => {
    const [chosenScore, setChosenScore] = useState()
    const [appetizerOne, setAppetizerOne] = useState(null)
    const { appetizerId } = useParams()

    console.log(appetizerOne?.comments?.$values);
    const getOneAppetizer = async () => {
        const res = await apiGetAppetizerById(appetizerId)
        console.log(res);
        if (res.status === 0) {
            setAppetizerOne(res.data)
        }
    }

    useEffect(() => {
        getOneAppetizer()
    }, [appetizerId])

    return (
        <div className={clsx(styles.container, 'app__bg')}>
            <div className={styles.wapper}>
                <div className={styles.image_dish}>
                    <img alt="" src={appetizerOne?.appetizerImage} />
                </div>
                <div>
                    <h3>{appetizerOne?.appetizerName}</h3>
                    <div className={cx("vote")}>
                        <div>
                            <span><FaRegStar /></span>
                            <span><FaRegStar /></span>
                            <span><FaRegStar /></span>
                            <span><FaRegStar /></span>
                            <span><FaRegStar /></span>
                        </div>
                        <div>
                            <p>100+</p>
                        </div>
                    </div>
                    <div className={cx("border-bottom")}></div>
                    <div className={cx("rating")}>
                        {voteOption.map(el => (
                            <div
                                key={el.id}
                                onClick={() => setChosenScore(el.id)}
                                className={cx('rating_star')}>
                                {
                                    (Number(chosenScore) && chosenScore >= el.id) ? <MdOutlineStarPurple500 size='20' color='orange' /> : <MdOutlineStarPurple500 size='20' color='gray' />
                                }
                                <span>{el.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div className={cx("comment_row")}>
                <div className={cx("comment_row_left")}>
                    <h3>Menu</h3>
                    <div className={cx("comment_dish_item")}><p>Banh kem</p></div>
                    <div className={cx("comment_dish_item")}><p>Banh kem</p></div>
                    <div className={cx("comment_dish_item")}><p>Banh kem</p></div>
                    <div className={cx("comment_dish_item")}><p>Banh kem</p></div>
                    <div className={cx("comment_dish_item")}><p>Banh kem</p></div>
                    <div className={cx("comment_dish_item")}><p>Banh kem</p></div>
                    <div className={cx("comment_dish_item")}><p>Banh kem</p></div>
                    <div className={cx("comment_dish_item")}><p>Banh kem</p></div>
                    <div className={cx("comment_dish_item")}><p>Banh kem</p></div>


                </div>
                <div>
                    <div className={cx("comment-container")}>
                        <div className={cx("comment-header")}><h2>Comments</h2></div>
                        {/* <Scrollbars style={{ width: 500, height: 300 }}> */}

                        <div style={{ marginBottom: "30px" }} className={cx("comment_row_right")}>
                            {
                                appetizerOne?.comments?.$values?.map(item => (
                                    <>
                                        <div className={cx("comment-content")}>
                                            <div className={cx("comment-avatar-user")}>
                                                <img alt="" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
                                            </div>
                                            <div className={cx("comment-content-user")}>
                                                <span>{item?.user?.userName}</span>
                                                <p>{item?.content}</p>
                                            </div>
                                            <div className={cx("reply-comment")}>
                                                <p>Reply</p>
                                            </div>
                                        </div>
                                        {
                                            item?.commentChildren?.$values.length > 0 && item?.commentChildren?.$values?.map(c => (
                                                <div className={cx("comment-reply")}>
                                                    <div className={cx("comment-avatar-user")}>
                                                        <img alt="" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
                                                    </div>
                                                    <div className={cx("comment-content-user")}>
                                                        <span>{item.user.userName}</span>
                                                        <p>{c.content}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                ))
                            }
                        </div>

                        {/* </Scrollbars> */}
                        <div className={cx("comment-content-input")}>
                            <div className={cx("comment-input")}>
                                <textarea placeholder="Comment.." />
                                <div className={cx("comment-submit_btn")}>
                                    <BsFillSendFill />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Comment;