import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import styles from './Notification.module.scss'
import { setRoomeCode, showChatForm, showNotification } from '../../redux/User/userSlice';

const Notification = () => {
    const { messageChat } = useSelector(state => state.user);
    const [messNotifi, setMessNotifi] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (messageChat) {
            const result = processMessages(messageChat);
            setMessNotifi(result);
        }
    }, [messageChat]);

    const processMessages = (messages) => {
        const grouped = messages.reduce((acc, message) => {
            if (!acc[message.roomCode]) {
                acc[message.roomCode] = [];
            }
            acc[message.roomCode].push(message);
            return acc;
        }, {});

        const lastMessagesPerRoom = Object.values(grouped).map(group => group[group.length - 1]);

        const otherMessages = messages.filter(message => !lastMessagesPerRoom.some(lastMsg => lastMsg.roomCode === message.roomCode));

        return [...lastMessagesPerRoom, ...otherMessages];
    };


    return (
        <div className={styles.wapper}>
            {
                messNotifi?.length > 0 && messNotifi?.map((item, index) => (
                    <div
                        className={styles.wapper_1}
                        key={item.timestamp}
                        onClick={() => {
                            dispatch(showChatForm({ showChat: true }))
                            dispatch(showNotification({ statusNotifi: false }))
                            // navigate(`/chat-box/${item.roomCode}`)
                            dispatch(setRoomeCode({roomCode: item.roomCode}))
                        }}
                    >
                        <div
                            className={styles.notifi_content}
                        // to={`/chat-box/${item.roomCode}`}
                        >
                            <span>{item.user}</span>
                            <p>{item.message}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Notification;
