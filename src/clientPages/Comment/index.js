import { Fragment, useEffect, useRef, useState } from 'react';
import { voteOption } from '../../ultil/menu';
import styles from './ModalCommnent.module.scss'
import { MdOutlineStarPurple500, MdStarOutline } from 'react-icons/md';
import classNames from 'classnames/bind';
import icons from "../../ultil/icons";
import clsx from 'clsx';
//import Scrollbars from 'react-custom-scrollbars-2';
import { BsFillSendFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetAllAppetizer, apiGetAllDessert, apiGetAllDish, apiGetAppetizerById } from '../../apis/menu';
import { apiAddComment, apiAddCommentReplyAppetizer, apiAddRatingAppetizer, apiAddRatingDessert, apiAddRatingDish, apiDeleteCommentAppetizer, apiDeleteCommentReplyAppetizer, apiEditCommentAppetizer, apiEditCommentReplyAppetizer, apiGetDessertById, apiGetDishById } from '../../apis/comment';
import { useSelector } from 'react-redux';
import { renderStarFromNumber } from '../../ultil/helper';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles)
const {
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
    const [editCommentReplyStatus, seteditCommentReplyStatus] = useState({})
    const [replyContent, setReplyContent] = useState('')
    const [clickOptionCommentReplyStatus, setClickOptionCommentReplyStatus] = useState({})
    const [contentEditReply, setcontentEditReply] = useState('')
    const [hoverDotCommentReplyStatus, setHoverDotCommentReplyStatus] = useState({})

    // const [clickAppetizerStatus, setClickAppetizerStatus] = useState(null)
    // const [clickDishStatus, setClickDishStatus] = useState(null)
    // const [clickDessertStatus, setClickDessertStatus] = useState(null)

    //rating
    const [userRating, setUserRating] = useState('')


    const navigate = useNavigate()
    const { appetizerId, dishId } = useParams()

    const commentRef = useRef(null);

    const [mainAppetizer, setAppetizer] = useState(null)
    const [mainDish, setDish] = useState(null)
    const [mainDessert, setDessert] = useState(null)
    const [userCurrentId, setUserCurrentIdId] = useState('')

    const getAllAppetizer = async () => {
        const responseAppetizer = await apiGetAllAppetizer()
        const responseDessert = await apiGetAllDessert()
        const responseDish = await apiGetAllDish()

        if (responseDish.status === 0) {
            setDish(responseDish.data.$values)
        }
        if (responseDessert.status === 0) {
            setDessert(responseDessert.data.$values)
        }
        if (responseAppetizer.status === 0) {
            setAppetizer(responseAppetizer.data.$values)
        }

    }
    useEffect(() => {
        getAllAppetizer()
    }, [])
    useEffect(() => {
        if (isLoggedIn) {
            var user = JSON.parse(localStorage.getItem("userCurrent"))
            setUserCurrent(user);
        }
    }, [isLoggedIn])

    const getOneAppetizer = async () => {
        if (+dishId === 1) {
            const resDish = await apiGetDishById(appetizerId)
            const pointRating = resDish?.data?.ratings?.$values

            var ratingUserPointDish = pointRating.find(rating => rating.userId === userCurrent?.id)?.point

            setUserRating(ratingUserPointDish)
            setAppetizerOne(resDish.data)

        } else if (+dishId === 2) {
            const resDessert = await apiGetDessertById(appetizerId)
            const pointRating = resDessert?.data?.ratings?.$values

            var ratingUserPointDessert = pointRating.find(rating => rating.userId === userCurrent.id)?.point

            setUserRating(ratingUserPointDessert)

            setAppetizerOne(resDessert.data)
        }
        else {
            const res = await apiGetAppetizerById(appetizerId)
            if (res.status === 0) {
                const pointRating = res.data.ratings.$values

                var ratingUserPoint = pointRating.find(rating => rating.userId === userCurrent.id)?.point
                // console.log(pointRating);
                // console.log(ratingUserPoint);

                setUserRating(ratingUserPoint)
                setAppetizerOne(res.data)
            }
        }

    }


    useEffect(() => {
        getOneAppetizer()
    }, [appetizerId, dishId, chosenScore, userCurrent])

    const hanldeSubmitComment = async () => {
        const comment = {
            content: content,
            userId: userCurrent.id,
            dishId: +dishId === 1 ? appetizerId : null,
            dessertId: +dishId === 2 ? appetizerId : null,
            appetizerId: +dishId === 0 ? appetizerId : null,
        }

        if (isLoggedIn) {
            const resAppetizer = await apiAddComment(comment)

            if (resAppetizer.status === 0) {
                setUserCurrentIdId(resAppetizer?.data?.userId)
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
                        $values: [newComment, ...prev.comments?.$values]
                    }
                }))
                setContent('')
                setTimeout(() => {
                    if (commentRef.current) {
                        commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            }
        } else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please Login to comment!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
            });
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
            if (isLoggedIn) {
                const resCommentReplyAppetizer = await apiAddCommentReplyAppetizer(reply)
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
                            $values: prev.comments?.$values?.map(comment =>
                                comment.id === commentId ? {
                                    ...comment,
                                    commentChildren: {
                                        $values: [newReply, ...comment.commentChildren?.$values || []]
                                    }
                                } : comment
                            ) || []
                        }
                    }))

                    setReplyContent('')
                    setClickReplyStatus(prev => ({
                        ...prev,
                        [index]: false
                    }));
                }
            } else {
                Swal.fire({
                    title: "You are not logged in",
                    text: "Please Login to comment!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Login"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login')
                    }
                });
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

    const handleEditCommentReply = (commentIndex, replyIndex) => {
        const uniqueKey = `${commentIndex}-${replyIndex}`;
        seteditCommentReplyStatus(prev => ({
            ...prev,
            [uniqueKey]: !prev[uniqueKey]
        }))
    }
    const hanldeSubmitCommentEditRepply = async (replyId, commentId, commentIndex, replyIndex) => {
        const updatedCommentReply = {
            replyId,
            content: contentEditReply,
            userId: userCurrent.id
        };
        try {
            const resEditCommentReply = await apiEditCommentReplyAppetizer(updatedCommentReply)
            if (resEditCommentReply.status === 0) {
                setAppetizerOne(prev => ({
                    ...prev,
                    comments: {
                        $values: prev.comments.$values.map((comment, cindex) => cindex === commentIndex ? {
                            ...comment,
                            commentChildren: {
                                $values: comment.commentChildren.$values.map((reply, rIndex) =>
                                    rIndex === replyIndex ? { ...reply, content: contentEditReply } : reply
                                )
                            }
                        } : comment)
                    }
                }))

                const uniqueKey = `${commentIndex}-${replyIndex}`;
                seteditCommentReplyStatus(prev => ({
                    ...prev,
                    [uniqueKey]: false
                }));
                setcontentEditReply('');
            }

        } catch (error) {
            console.log(error);
        }

    }
    // 
    const handleMouseDownReply = (index) => {
        setHoverDotCommentReplyStatus(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    //rating
    const handleRatingClick = async (score) => {
        setChosenScore(+score);
        setUserRating(+score);
        // await addRating(+score);

    };

    const addRating = async () => {
        // console.log(score);
        if (isLoggedIn) {
            const rating = {
                userId: userCurrent.id,
                dishId: +dishId === 1 ? appetizerId : null,
                dessertId: +dishId === 2 ? appetizerId : null,
                appetizerId: +dishId === 0 ? appetizerId : null,
                point: chosenScore
            }
            let resRatingAppetizer;
            if (+dishId === 0) {
                resRatingAppetizer = await apiAddRatingAppetizer(rating)
            } else if (+dishId === 1) {
                resRatingAppetizer = await apiAddRatingDish(rating);
            } else if (+dishId === 2) {
                resRatingAppetizer = await apiAddRatingDessert(rating);
            }

            if (resRatingAppetizer.status === 0) {
                // console.log(resRatingAppetizer);
                getOneAppetizer()
                setUserRating(resRatingAppetizer?.data?.point);

            }
        } else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please Login to comment!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
            });
        }

    }
    useEffect(() => {
        if (chosenScore != null) {
            addRating();
        }
    }, [chosenScore])

    return (
        <div className={clsx(styles.container, 'app__bg')}>
            <div className={styles.wapper}>
                <div className={styles.image_dish}>
                    <img alt="" src={appetizerOne?.image} />
                </div>
                <div>
                    <h3>{appetizerOne?.name}</h3>
                    <div className={cx("vote")}>
                        <div>
                            {
                                renderStarFromNumber(appetizerOne?.totalRating)?.map((item, index) => (
                                    <span key={index}>{item}</span>
                                ))
                            }
                            {
                                appetizerOne?.totalRating === null &&
                                Array.from({ length: 5 }).map((_, index) => (
                                    <span><MdStarOutline color="orange" size='30' /></span>
                                ))
                            }

                        </div>
                        <div>
                            {appetizerOne?.countRatings !== null ? <p>{appetizerOne?.countRatings} reviews</p> : ''}
                        </div>
                    </div>
                    <div className={cx("border-bottom")}></div>
                    <div className={cx("rating")}>
                        {voteOption.map(el => (
                            <div
                                key={el.id}
                                // onClick={() => setChosenScore(el.id)}
                                onClick={() => handleRatingClick(el.id)}
                                className={cx('rating_star')}>

                                {/* (Number(chosenScore) && chosenScore >= el.id)  */}
                                {
                                    userRating && el.id <= userRating
                                        ?

                                        <MdOutlineStarPurple500 size='20' color='orange' />
                                        :
                                        <MdOutlineStarPurple500 size='20' color='gray' />
                                }
                                <span>{el.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div className={cx("comment_row")}>
                <div className={cx("comment_row_left")}>
                    <h3>Appetizer</h3>
                    {
                        mainAppetizer?.length > 0 && mainAppetizer?.map((item, index) => (
                            <div
                                onClick={() => {
                                    // setClickAppetizerStatus(index)
                                    // setClickDishStatus(null)
                                    navigate(`/comment/${item.id}/0`)
                                }}
                                key={item.id} className={cx("comment_dish_item")}>
                                {/* , +clickAppetizerStatus === index ? 'active' : '' */}
                                <p
                                >
                                    {item.appetizerName}
                                </p>
                            </div>
                        ))
                    }
                    <h3>Dish</h3>
                    {
                        mainDish?.length > 0 && mainDish?.map((item, index) => (
                            <div
                                onClick={() => {
                                    // setClickAppetizerStatus(null)
                                    // setClickDishStatus(index)
                                    navigate(`/comment/${item.id}/1`)
                                }}
                                // , +clickDishStatus === index ? 'active' : ''
                                key={item.id} className={cx("comment_dish_item")}><p>{item.name}</p></div>

                        ))
                    }
                    <h3>Dessert</h3>
                    {
                        mainDessert?.length > 0 && mainDessert?.map(item => (
                            <div
                                onClick={() => navigate(`/comment/${item.id}/2`)}
                                key={item.id} className={cx("comment_dish_item")}><p>{item.dessertName}</p></div>
                        ))
                    }

                </div>
                <div>
                    <div className={cx("comment-container")}>
                        <div className={cx("comment-header")}><h2>Comments</h2></div>
                        {/* <Scrollbars style={{ width: 500, height: 300 }}> */}
                        {/* +item.user?.id === +userCurrent?.id || userCurrentId === +item.user?.id ? */}

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
                                                    (+item.user?.id === +userCurrent?.id || item.user.id === userCurrentId) &&
                                                    <div className={cx("comment-option")}>
                                                        <p
                                                            onClick={() => handleClickDeleteComment(item.id)}
                                                        >
                                                            Delete
                                                        </p>
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
                                                <div
                                                    onMouseEnter={() => handleMouseDownReply(index)}
                                                    onMouseLeave={() => setHoverDotCommentReplyStatus(false)}
                                                    key={replyIndex} className={cx("comment-reply")}>
                                                    <div className={cx("comment-avatar-user")}>
                                                        <img alt="" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
                                                    </div>
                                                    {
                                                        !editCommentReplyStatus[`${index}-${replyIndex}`] &&
                                                        <div className={cx("comment-content-user")}>
                                                            <span>{item.user.userName}</span>
                                                            <p>{c.content}</p>
                                                        </div>
                                                    }

                                                    {/* ----------------input edit reply-------------*/}
                                                    {
                                                        editCommentReplyStatus[`${index}-${replyIndex}`] &&
                                                        <div div className={cx("comment-input_edit_reply")}>
                                                            <textarea
                                                                value={contentEditReply}
                                                                onChange={(e) => setcontentEditReply(e.target.value)}
                                                                placeholder="Reply.." />
                                                            <div
                                                                onClick={() => hanldeSubmitCommentEditRepply(c.id, item.id, index, replyIndex)}
                                                                className={cx("comment-submit_btn")}>
                                                                <BsFillSendFill />
                                                            </div>
                                                            <div className={cx("comment-reply_cancel")}>
                                                                <p
                                                                    onClick={() => {
                                                                        seteditCommentReplyStatus(prev => !prev)
                                                                        setcontentEditReply('')
                                                                    }
                                                                    }
                                                                >Cancel</p>
                                                            </div>
                                                        </div>
                                                    }
                                                    <div
                                                        onClick={() => handleClickOPtionCommentReply(index, replyIndex)}
                                                        className={cx("comment-dot")}>
                                                        {
                                                            hoverDotCommentReplyStatus[index] &&
                                                            <BsThreeDots />
                                                        }
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
                                                                    onClick={() => handleEditCommentReply(index, replyIndex)}
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