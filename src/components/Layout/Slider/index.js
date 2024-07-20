import classNames from 'classnames/bind';
import styles from './Slider.module.scss'
import icons from '../../../ultil/icons';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles)
const { GrPrevious, GrNext } = icons


const Slider = ({ slideImages,
    discountStatus,
    handleOnClickPrev,
    handleOnClickNext,
    handleOnclickDot,
    active,
    imageSrc = false,
    clickImageStatus = false,
    dotStatus
}) => {
    const listRef = useRef()
    const itemsRef = useRef([])
    const dotsRef = useRef([])

    useEffect(() => {
        reloadSlider()
    }, [active])

    const reloadSlider = () => {
        if (itemsRef.current[active] && listRef.current) {
            const checkLeft = itemsRef.current[active].offsetLeft
            listRef.current.style.left = -checkLeft + 'px';
        }
    }



    useEffect(() => {
        dotsRef.current.forEach((dot, index) => {
            if (index === active) {
                dot.classList.add(cx("active"))
            } else {
                dot.classList.remove(cx("active"))
            }
        })
    }, [active])

    return (
        <div className={cx("slider")}>
            <div className={clsx(styles.list, "list-image-slider")} ref={listRef}>
                {
                    slideImages.map((item, index) => (
                        <div
                            className={clsx(styles.item, "images-slider")}
                            key={index}
                            ref={el => itemsRef.current[index] = el}
                        >
                            <img alt="" src={clickImageStatus ? imageSrc : item.image} />
                            {
                                discountStatus &&
                                <div className={cx("content")}>
                                    <p className={cx("restaurant-name")}>{item.restauranName}</p>
                                    <p className={cx("restaurant-address")}>{item.address}</p>
                                    <div className={cx("discount")}>
                                        <p>{item.discount}</p>
                                    </div>
                                    <div className={cx("btn-order")}>
                                        <p className={cx("order")}>Order now</p>
                                    </div>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
            <div className={cx("btn")}>
                <button
                    className={clsx(styles.prev, "prev-slider-btn")}
                    onClick={handleOnClickPrev}
                >
                    <GrPrevious />
                </button>
                <button
                    onClick={handleOnClickNext}
                    className={clsx(styles.next, "nextslider-btn")}>
                    <GrNext />
                </button>
            </div>
            <ul className={clsx(styles.dots, "dots-active")}>
                {
                    dotStatus && (
                        slideImages.map((_, index) => (
                            <li
                                key={index}
                                onClick={() => handleOnclickDot(index)}
                                className={index === active ? cx("active") : ""}
                                ref={el => dotsRef.current[index] = el}
                            >
                            </li>
                        ))
                    )
                }
            </ul>
        </div>
    );
};

export default Slider;