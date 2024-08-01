import { Fragment, useEffect, useRef, useState } from 'react';
import { voteOption } from '../../ultil/menu';
import styles from './ModalCommnent.module.scss'
import { MdOutlineStarPurple500 } from 'react-icons/md';
import classNames from 'classnames/bind';
import icons from "../../ultil/icons";
import clsx from 'clsx';
//import Scrollbars from 'react-custom-scrollbars-2';
import { BsFillSendFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { apiGetAppetizerById } from '../../apis/menu';
import { apiAddCommentAppetizer, apiAddCommentReplyAppetizer, apiDeleteCommentAppetizer, apiDeleteCommentReplyAppetizer, apiEditCommentAppetizer } from '../../apis/comment';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles)
const { FaRegStar,
    BsThreeDots,
} = icons
const Comment = () => {
    const [chosenScore, setChosenScore] = useState()
    const [appetizerOne, setAppetizerOne] = useState(null)
    const [content, setContent] = useState('')
    const { isLoggedIn } = useSelector(state => state.user)
    const [userCurrent, setUserCurrent] = useState('')
    const [clickOptionCommentStatus, setClickOptionCommentStatus] = useState({})
    const [hoverDotCommentStatus, setHoverDotCommentStatus] = useState({})
    const [editCommentStatus, seteditCommentStatus] = useState({})
    const [contentCommentEdit, setContentCommentEdit] = useState('')
    //reply
    const [clickReplyStatus, setClickReplyStatus] = useState({})
    const [replyContent, setReplyContent] = useState('')
    const [clickOptionCommentReplyStatus, setClickOptionCommentReplyStatus] = useState({})

    const { appetizerId } = useParams()
    const commentRef = useRef(null);


    useEffect(() => {
        if (isLoggedIn) {
            var user = JSON.parse(localStorage.getItem("userCurrent"))
            setUserCurrent(user);
        }
    }, [isLoggedIn])

    const getOneAppetizer = async () => {

        const res = await apiGetAppetizerById(appetizerId)
        if (res.status === 0) {
            setAppetizerOne(res.data)
        }
    }

    useEffect(() => {
        getOneAppetizer()
    }, [appetizerId])

    const hanldeSubmitComment = async () => {
        const comment = {
            content: content,
            userId: userCurrent.id,
            appetizerId
        }
        const resAppetizer = await apiAddCommentAppetizer(comment)
        if (resAppetizer.status === 0) {
            const newComment = {
                id: resAppetizer.data.id,
                content: comment.content,
                user: {
                    userName: userCurrent.userName
                }
            }
            setAppetizerOne(prev => ({
                ...prev,
                comments: {
                    // $values: [...prev.comments.$values, newComment]
                    $values: [newComment, ...prev.comments.$values]
                }
            }))
            setContent('')
            setTimeout(() => {
                if (commentRef.current) {
                    commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }

    const handleClickOPtionComment = (index) => {
        setClickOptionCommentStatus(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }
    const handleMouseDown = (index) => {
        setHoverDotCommentStatus(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }
    const handleClickDeleteComment = async (commentId) => {
        const deleteComment = {
            commentId,
            userId: userCurrent.id
        }
        const resDeleteComment = await apiDeleteCommentAppetizer(deleteComment)
        if (resDeleteComment.status === 0) {
            setAppetizerOne(prev => ({
                ...prev,
                comments: {
                    $values: prev.comments.$values.filter(comment => comment.id !== commentId)
                }
            }))
        }
    }

    const handleEditComment = async (index) => {
        seteditCommentStatus(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }
    const handleCancleComment = async (index) => {
        seteditCommentStatus(prev => ({
            ...prev,
            [index]: false
        }))
        setContentCommentEdit('');
    }
    const hanldeSubmitCommentEdit = async (commentId, index) => {

        const updatedComment = {
            commentId,
            comment: contentCommentEdit,
            userId: userCurrent.id
        };
        try {
            const resEditCommentAppetizer = await apiEditCommentAppetizer(updatedComment)
            console.log(resEditCommentAppetizer);
            if (resEditCommentAppetizer.status === 0) {
                setAppetizerOne(prev => ({
                    ...prev,
                    comments: {
                        $values: prev.comments.$values.map(comment =>
                            comment.id === commentId ? { ...comment, content: contentCommentEdit } : comment
                        )
                    }
                }))
                seteditCommentStatus(prev => ({
                    ...prev,
                    [index]: false
                }));
                setContentCommentEdit('');
            }
        } catch (error) {
            console.log(error);
        }
    }


    //------------------------reply------------------
    const handleClickReply = (index) => {
        setClickReplyStatus(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const hanldeSubmitCommentRepply = async (commentId, index) => {
        const reply = {
            content: replyContent,
            userId: userCurrent.id,
            commentId: commentId
        };
        try {
            const resCommentReplyAppetizer = await apiAddCommentReplyAppetizer(reply)
            // console.log(resCommentReplyAppetizer);
            if (resCommentReplyAppetizer.status === 0) {
                const newReply = {
                    id: resCommentReplyAppetizer.data.id,
                    content: reply.content,
                    user: {
                        userName: userCurrent.userName
                    }
                }
                setAppetizerOne(prev => ({
                    ...prev,
                    comments: {
                        $values: prev.comments.$values.map(comment =>
                            comment.id === commentId ? {
                                ...comment,
                                commentChildren: {
                                    $values: [newReply, ...comment.commentChildren.$values]
                                }
                            } : comment
                        )
                    }
                }))

                setReplyContent('')
                setClickReplyStatus(prev => ({
                    ...prev,
                    [index]: false
                }));
            }

        } catch (error) {
            console.log(error);
        }

    }

    const handleClickOPtionCommentReply = (commentIndex, replyIndex) => {
        const uniqueKey = `${commentIndex}-${replyIndex}`;
        setClickOptionCommentReplyStatus(prev => ({
            ...prev,
            [uniqueKey]: !prev[uniqueKey]
        }))
    }

    const handleClickDeleteCommentReply = async (replyId, commentId) => {
        const deleteComment = {
            commentId: replyId,
            userId: userCurrent.id
        }
        const resDeleteCommentReply = await apiDeleteCommentReplyAppetizer(deleteComment)
        if (resDeleteCommentReply.status === 0) {
            console.log(resDeleteCommentReply);
            setAppetizerOne(prev => ({
                ...prev,
                comments: {
                    $values: prev.comments.$values.map(comment =>
                        comment.id === commentId ? {
                            ...comment,
                            commentChildren: {
                                $values: comment.commentChildren.$values.filter(reply => reply.id !== replyId)
                            }
                        } : comment
                    )
                }
            }))
        }
    }
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
                                appetizerOne?.comments?.$values?.map((item, index) => (
                                    <div key={index}>
                                        <div
                                            onMouseEnter={() => handleMouseDown(index)}
                                            onMouseLeave={() => setHoverDotCommentStatus(false)}
                                            ref={index === 0 ? commentRef : null} className={cx("comment-content")}>
                                            <div className={cx("comment-avatar-user")}>
                                                <img alt="" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
                                            </div>
                                            <div

                                                className={cx("comment-content-user")}>
                                                {
                                                    !editCommentStatus[index] &&
                                                    <>
                                                        <span>{item?.user?.userName}</span>
                                                        <p>{item?.content}</p>
                                                    </>
                                                }
                                                {
                                                    editCommentStatus[index] &&
                                                    <div className={cx("comment-input_edit")}>
                                                        <textarea
                                                            value={contentCommentEdit}
                                                            onChange={(e) => setContentCommentEdit(e.target.value)}
                                                            placeholder="Comment.." />
                                                        <div
                                                            onClick={() => hanldeSubmitCommentEdit(item.id, index)}
                                                            className={cx("comment-submit_btn")}>
                                                            <BsFillSendFill />
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div
                                                onClick={() => handleClickOPtionComment(index)}
                                                className={cx("comment-dot")}>
                                                {
                                                    hoverDotCommentStatus[index] &&
                                                    <BsThreeDots />
                                                }
                                                {
                                                    clickOptionCommentStatus[index] &&
                                                    <div className={cx("comment-option")}>
                                                        <p
                                                            onClick={() => handleClickDeleteComment(item.id)}
                                                        >Delete</p>
                                                        <p
                                                            onClick={() => handleEditComment(index)}
                                                        >Edit</p>
                                                    </div>
                                                }
                                            </div>
                                            <div className={cx("reply-comment")}>
                                                {
                                                    editCommentStatus[index]
                                                        ?
                                                        <p
                                                            onClick={() => handleCancleComment(index)}
                                                        >Cancel</p>
                                                        :
                                                        <p
                                                            onClick={() => handleClickReply(index)}
                                                        >Reply</p>
                                                }
                                            </div>
                                        </div>
                                        {/* input reply */}
                                        {
                                            clickReplyStatus[index] &&
                                            <div div className={cx("comment-input_reply")}>
                                                <textarea
                                                    value={replyContent}
                                                    onChange={(e) => setReplyContent(e.target.value)}
                                                    placeholder="Reply.." />
                                                <div
                                                    onClick={() => hanldeSubmitCommentRepply(item.id, index)}
                                                    className={cx("comment-submit_btn")}>
                                                    <BsFillSendFill />
                                                </div>
                                                <div className={cx("comment-reply_cancel")}>
                                                    <p
                                                        onClick={() => {
                                                            setClickReplyStatus(prev => ({
                                                                ...prev,
                                                                [index]: false
                                                            }))
                                                            setReplyContent('')
                                                        }
                                                        }
                                                    >Cancel</p>
                                                </div>
                                            </div>
                                        }

                                        {
                                            item?.commentChildren?.$values.length > 0 && item?.commentChildren?.$values?.map((c, replyIndex) => (
                                                <div key={replyIndex} className={cx("comment-reply")}>
                                                    <div className={cx("comment-avatar-user")}>
                                                        <img alt="" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
                                                    </div>
                                                    <div className={cx("comment-content-user")}>
                                                        <span>{item.user.userName}</span>
                                                        <p>{c.content}</p>
                                                    </div>


                                                    <div
                                                        onClick={() => handleClickOPtionCommentReply(index, replyIndex)}
                                                        className={cx("comment-dot")}>
                                                        <BsThreeDots />
                                                        {/* {
                                                    hoverDotCommentStatus[index] &&
                                                } */}
                                                        {
                                                            clickOptionCommentReplyStatus[`${index}-${replyIndex}`] &&
                                                            <div className={cx("comment-option")}>
                                                                <p
                                                                    onClick={() => handleClickDeleteCommentReply(c.id, item.id)}
                                                                >Delete</p>
                                                                <p
                                                                    onClick={() => handleEditComment(replyIndex)}
                                                                >Edit</p>
                                                            </div>

                                                        }

                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>

                        {/* </Scrollbars> */}
                        <div className={cx("comment-content-input")}>
                            <div className={cx("comment-input")}>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Comment.." />
                                <div
                                    onClick={hanldeSubmitComment}
                                    className={cx("comment-submit_btn")}>
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