
import { useEffect, useState } from 'react';
import styles from './Lobby.module.scss'
import clsx from 'clsx';
import { apiGetAllLobby } from '../../apis/lobby';

const Lobby = () => {
    const [lobby, setLobby] = useState(null)

    const getAllLobby = async () => {
        const response = await apiGetAllLobby()
        if (response.status === 0) {
            setLobby(response.data.$values)
        }
    }
    useEffect(() => {
        getAllLobby()
    }, [])
    console.log(lobby);
    return (
        <div className={clsx(styles.container_lobby, 'app__bg')}>
            <div className={styles.info_lobby}>
                <div className={styles.lobby_title}><h1>Our Lobby</h1></div>
                <div className={styles.info_lobby_more}>
                    <div className={styles.info_lobby_img}>
                        {
                            lobby?.[0]?.lobbyImages?.$values?.map(item => (
                                <img key={item.id} alt="" src={item?.imagesUrl} />
                            ))
                        }
                    </div>
                    <div className={styles.info_title}>
                        <div className={styles.info_title_header}><h3>{lobby?.[0]?.lobbyName}</h3></div>
                        <div className={styles.info_title_body}>
                            <span>{lobby?.[0]?.description}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.info_lobby_more}>
                    <div className={styles.info_title}>
                        <div className={styles.info_title_header}><h3>{lobby?.[1]?.lobbyName}</h3></div>
                        <div className={styles.info_title_body}>
                            <span>
                                {lobby?.[1]?.description}
                            </span>
                        </div>
                    </div>
                    <div className={styles.info_lobby_img}>
                        {
                            lobby?.[1]?.lobbyImages?.$values?.map(item => (
                                <img key={item.id} alt="" src={item?.imagesUrl} />
                            ))
                        }
                    </div>
                </div>

                <div className={styles.info_lobby_more}>
                    <div className={styles.info_lobby_img}>
                        {
                            lobby?.[2]?.lobbyImages?.$values?.map(item => (
                                <img key={item.id} alt="" src={item?.imagesUrl} />
                            ))
                        }
                    </div>
                    <div className={styles.info_title}>
                        <div className={styles.info_title_header}><h3>{lobby?.[2]?.lobbyName}</h3></div>
                        <div className={styles.info_title_body}>
                            <span>{lobby?.[2]?.description}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lobby;