import { useEffect, useState } from 'react';
import styles from './Lobby.module.scss';
import clsx from 'clsx';
import { apiGetAllLobby } from '../../apis/lobby';

const Lobby = () => {
    const [lobby, setLobby] = useState([]);

    const getAllLobby = async () => {
        const response = await apiGetAllLobby();
        if (response.status === 0) {
            setLobby(response.data.$values);
        }
    };

    useEffect(() => {
        getAllLobby();
    }, []);

    return (
        <div className={clsx(styles.container_lobby, 'app__bg')}>
            <div className={styles.info_lobby}>
                {lobby.map((item, index) => (
                    <div
                        key={item.id}
                        className={clsx(styles.info_lobby_more, {
                            [styles.leftImage]: index % 2 === 0,
                            [styles.rightImage]: index % 2 !== 0
                        })}
                    >
                        <div className={styles.info_lobby_img}>
                            {item.lobbyImages?.$values?.map(image => (
                                <img key={image.id} alt="" src={image.imagesUrl} />
                            ))}
                        </div>
                        <div className={styles.info_title}>
                            <div className={styles.info_title_header}>
                                <h3>{item.lobbyName}</h3>
                            </div>
                            <div className={styles.info_title_body}>
                                <span>{item.description}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Lobby;
