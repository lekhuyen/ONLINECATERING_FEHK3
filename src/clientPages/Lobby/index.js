
import styles from './Lobby.module.scss'
import clsx from 'clsx';

const Lobby = () => {
    return (
        <div className={clsx(styles.container_lobby, 'app__bg')}>
            <div className={styles.info_lobby}>
                <div className={styles.lobby_title}><h1>Our Lobby</h1></div>
                <div className={styles.info_lobby_more}>
                    <div className={styles.info_lobby_img}>
                        <img alt="" src="http://bachviet.com.vn/wp-content/uploads/elementor/thumbs/6-nzh15jl73tlvj8mhyxxqa0nk415nq6tseyin8cp548.jpg" />
                    </div>
                    <div className={styles.info_title}>
                        <div className={styles.info_title_header}><h3>Mars Lobby</h3></div>
                        <div className={styles.info_title_body}>
                            <span>With 2 tones of lavender purple and pastel pink, these are new, modern and charming colors.
                                The romantic and sophisticated space of purple or the youthful space of pink will give guests a joyful feeling.
                                With the desire to bring a new, romantic and sophisticated space, Mars Lobby is the perfect space for couples on their happy day, opening up a life filled with love!</span>
                        </div>

                    </div>
                </div>
                <div className={styles.info_lobby_more}>
                    <div className={styles.info_title}>
                        <div className={styles.info_title_header}><h3>Venus Lobby</h3></div>
                        <div className={styles.info_title_body}>
                            <span>The fresh green tone is the color of nature, youthful and full of hope.
                                Venus Lobby chose this tone as the main color to bring a joyful and pleasant feeling to the guests attending.
                                This is a modern, fresh style hall full of joy and happiness.
                            </span>
                        </div>

                    </div>
                    <div className={styles.info_lobby_img}>
                        <img alt="" src="http://bachviet.com.vn/wp-content/uploads/2020/06/3-3.jpg" />
                    </div>
                </div>
                <div className={styles.info_lobby_more}>

                    <div className={styles.info_lobby_img}>
                        <img alt="" src="http://bachviet.com.vn/wp-content/uploads/2020/06/3-3.jpg" />
                    </div>
                    <div className={styles.info_title}>
                        <div className={styles.info_title_header}><h3>Peony Lobby</h3></div>
                        <div className={styles.info_title_body}>
                            <span>Designed with 2 tones of copper yellow and Bordeaux red, which are two traditional colors typical for wedding spaces.
                                The brilliant red or the splendid noble yellow both create a warm and luxurious feeling.
                                Peony Lobby is designed and decorated with these two colors as a good wish that OnlineCatering.in wants to send to the couple on their big day.
                                The warmth of these two colors will contribute to creating a friendly and comfortable atmosphere.
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lobby;