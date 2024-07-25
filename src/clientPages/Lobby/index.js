
import styles from './Lobby.module.scss'
import clsx from 'clsx';

const Lobby = () => {
    return (
        <div className={clsx(styles.container_lobby, 'app__bg')}>
            <div className={styles.info_lobby}>
            <div className={styles.lobby_title}><h2>SẢNH TIỆC CƯỚI</h2></div>
                <div className={styles.info_lobby_more}>
                    <div className={styles.info_lobby_img}>
                        <img alt="" src="http://bachviet.com.vn/wp-content/uploads/elementor/thumbs/6-nzh15jl73tlvj8mhyxxqa0nk415nq6tseyin8cp548.jpg" />
                    </div>
                    <div className={styles.info_title}>
                        <div className={styles.info_title_header}><h3>SẢNH ROSY</h3></div>
                        <div className={styles.info_title_body}>
                            <span>Với 2 tone màu tím lavender  và hồng  pastel là những gam màu mới hiện đại đầy 
                                quyến rũ. Không gian lãng mạng đầy tinh tế của sắc tím hay không gian tươi trẻ của 
                                sắc hồng sẽ tạo cho khách mời một cảm giác vui vẻ. Với mong muốn mang lại một không 
                                gian mới mẻ, lãng mạng và tinh tế thì sảnh Rosy là không gian hoàn hảo cho các cặp đôi 
                                trong ngày hạnh phúc, mở ra một cuộc sống ngập tràn yêu thương!
                            </span>
                        </div>
                        
                    </div>
                </div>
                <div className={styles.info_lobby_more}>
                    <div className={styles.info_title}>
                        <div className={styles.info_title_header}><h3>SẢNH GREEN</h3></div>
                        <div className={styles.info_title_body}>
                            <span>Tone màu xanh tươi mát là sắc màu của thiên nhiên, trẻ trung và tràn đầy hy vọng. 
                            Sảnh Green lựa chọn tone màu này làm chủ đạo để đem lại cảm giác vui tươi dễ chịu cho 
                            khách mời tham dự. Đây là sảnh mang phong cách hiện đại, tươi mát đầy niềm vui và hạnh phúc.
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
                        <div className={styles.info_title_header}><h3>SẢNH GOLD</h3></div>
                        <div className={styles.info_title_body}>
                            <span>Được thiết kế với 2 tone màu vàng đồng và đỏ Bordeaux là hai sắc màu truyền 
                            thống đặc trưng cho không gian tiệc cưới. Màu đỏ rực rỡ hay màu vàng quý phái lộng 
                            lẫy đều tạo nên cảm giác ấm áp sang trọng. Sảnh Gold được thiết kế và trang trí với 
                            hai sắc màu này như một lời chúc tốt lành mà BáchViệt muốn gửi đến đôi bạn trong ngày 
                            trọng đại.Từ sự ấm áp bởi 2 sắc màu này sẽ góp phần tạo nên không khí thân thiện, thoải mái.
                            </span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lobby;