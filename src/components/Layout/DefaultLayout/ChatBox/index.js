import { BsFillSendFill } from 'react-icons/bs';
import styles from './ChatBox.module.scss'
import * as signalR from '@microsoft/signalr';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import classNames from 'classnames/bind';
import { getMessageChat, roomCodeUserJoin, showChatForm } from '../../../../redux/User/userSlice';
// import { useParams } from 'react-router-dom';
import { AiFillMessage } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

const cx = classNames.bind(styles)

const ChatBox = () => {
    const [connection, setConnection] = useState(null);
    const [userCurrent, setUserCurrent] = useState(JSON.parse(localStorage.getItem("userCurrent")) || null);
    const [messages, setMessages] = useState([]);
    const [chatContent, setChatContent] = useState('')
    // const [showChatStatus, setShowChatStatus] = useState(false)

    const { isLoggedIn, showChatStatus, roomCode,roomCodeJoin } = useSelector(state => state.user)
    const dispatch = useDispatch()
    // const { roomCode } = useParams()
    const endOfMessagesRef = useRef(null)
    useEffect(() => {
        if (isLoggedIn) {
            var user = JSON.parse(localStorage.getItem("userCurrent"))
            setUserCurrent(user);
        }
    }, [isLoggedIn])


    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5044/chat", {
                withCredentials: true
            })
            .withAutomaticReconnect()
            .build();

        newConnection.start()
            .then(() => {
                setConnection(newConnection)
            })
            .catch(e => {
                console.log("connect failed: ", e);
            })

    }, [userCurrent, isLoggedIn])
    useEffect(() => {
        if (connection && userCurrent.role === "Admin") {
            joinAllRooms();
        }
    }, [connection]);

    const joinAllRooms = async () => {
        try {
            const response = await axios.get("http://localhost:5044/api/Room/");
            if (response.data && response.data.status === 0) {

                for (const room of response.data.data) {
                    await connection.invoke("JoinRoom", userCurrent.userEmail, room.roomCode);
                }
            }
        } catch (error) {
            console.error("Error joining rooms:", error);
        }
    };

    const handleSubmitChat = useCallback(async () => {
        try {
            if (userCurrent.role === "User") {
                await connection.invoke("Sendmessage", userCurrent?.userEmail, chatContent, `${userCurrent?.id}`);
            } else if (userCurrent.role === "Admin") {
                await connection.invoke("Sendmessage", userCurrent?.userEmail, chatContent, roomCode);
            }
            setChatContent("");
        } catch (error) {
            console.log('Error sending message via SignalR:', error);
        }
    }, [connection, chatContent, userCurrent, roomCode]);

    useEffect(() => {
        if (connection) {
            connection.on("ReceiMessage", (user, userId, message, timestamp, roomCode) => {
                setMessages(messages => {
                    const newMessage = { user, userId, message, timestamp, roomCode, type: "message" };
                    const messageExists = messages.some(m => m.timestamp === newMessage.timestamp);
                    return messageExists ? messages : [...messages, newMessage];
                });
            });
            // connection.on("UserJoined", (user, roomCode) => {
            //     setMessages(messages => [...messages, { user, roomCode, type: "notification", action: "joined" }])
            // })
            connection.on("ReceiveMessageHistory", (messageHistory) => {
                setMessages(messageHistory)
            });
        }
    }, [connection, userCurrent, roomCode])

    useEffect(() => {
        dispatch(getMessageChat({ messageChat: messages }))
    }, [messages])

    useEffect(() => {
        const joinRoomAdmin = async () => {
            if (userCurrent.role === "Admin") {
                if (roomCode) {
                    try {
                        const response = await axios.post("http://localhost:5044/api/Room/join", {
                            roomCode: roomCode,
                        })
                        if (response?.data?.status === 0) {
                            await connection.invoke("JoinRoom", userCurrent?.userEmail, roomCode)
                        } else {
                            alert("Invalid room name or password");
                        }
                    } catch (error) {
                        console.log("error join room: ", error);
                    }
                }
            }
        }
        joinRoomAdmin()
    }, [roomCode])

    const joinRoom = async (e) => {
        dispatch(showChatForm({ showChat: true }))
        if (connection?._connectionStarted && userCurrent.role === "User") {
            try {
                const response = await axios.post("http://localhost:5044/api/Room/join", {
                    roomCode: `${userCurrent?.id}`,
                })
                if (response?.data?.status === 1) {
                    const resAddRoom = await axios.post("http://localhost:5044/api/Room/", {
                        roomCode: `${userCurrent?.id}`,
                    })
                    console.log(resAddRoom);
                    
                    if (resAddRoom?.data?.status === 0) {
                        dispatch(roomCodeUserJoin({roomCodeJoin:response.data.data}))
                        await connection.invoke("JoinRoom", userCurrent?.userEmail, `${userCurrent?.id}`)
                    }
                }
                if (response?.data?.status === 0) {
                    dispatch(roomCodeUserJoin({roomCodeJoin:response.data.data}))

                    await connection.invoke("JoinRoom", userCurrent?.userEmail, `${userCurrent?.id}`)
                } else {
                    alert("Invalid room name or password");
                }
            } catch (error) {
                console.log("error join room: ", error);
            }
        }
    }

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className={styles.chatBox_wapper}>
            {
                showChatStatus && (
                    <div className={styles.waper_container}>
                        <div
                            className={styles.chatBox_header}>
                            <h4>{userCurrent?.userName}</h4>
                            <div
                                onClick={() => dispatch(showChatForm({ showChat: false }))}
                                className={styles.icon_close}><IoCloseSharp size="25" /></div>
                        </div>
                        <div className={clsx(styles.chatBox_content)}>
                            {roomCode ? (
                                messages.filter(m => m.roomCode === roomCode).map((m, index) => {
                                    let userIdMessage = m.userId === userCurrent?.id;
                                    return (
                                        <div key={m.timestamp}>
                                            <div
                                                className={cx(userIdMessage ? "chatBox_content_1" : "chatBox_content_more_2")}>
                                                <div className={styles.chatBox_content_more}>
                                                    <div><strong>{m.user}</strong></div>
                                                    <span> {m.message}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                messages.filter(m => m.roomCode === roomCodeJoin).map((m, index) => {
                                    let userIdMessage = m.userId === userCurrent?.id;
                                    return (
                                        <div key={m.timestamp}>
                                            <div
                                                // style={{ backgroundColor: userIdMessage ? "#3578E5" : "red" }}
                                                className={cx(userIdMessage ? "chatBox_content_1" : "chatBox_content_more_2")}>
                                                <div className={styles.chatBox_content_more}>
                                                    <p><strong>{m.user}</strong></p>
                                                    <p>{m.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={endOfMessagesRef} />
                        </div>
                        <div className={styles.chatBox_write}>
                            <div className={styles.chat_box_input}>
                                <textarea
                                    value={chatContent}
                                    onChange={(e) => setChatContent(e.target.value)}
                                    placeholder="Write.." />
                                <div
                                    onClick={handleSubmitChat}
                                    className={styles.btn_submit}>
                                    <BsFillSendFill />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                !showChatStatus && (
                    <div className={styles.show_chat}>
                        <div
                            onClick={joinRoom}
                            className={styles.icon_show}>
                            <AiFillMessage size="50" />
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default ChatBox;