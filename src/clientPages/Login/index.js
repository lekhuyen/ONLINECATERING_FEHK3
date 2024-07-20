import classNames from "classnames/bind";
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

const Login = () => {
    return (
        <section>
            <div className={cx("color")}></div>
            <div className={cx("color")}></div>
            <div className={cx("color")}></div>
            <div className={cx("box")}>
                <div className={cx("square")} style={{"--i": 0}}></div>
                <div className={cx("square")} style={{"--i": 1}}></div>
                <div className={cx("square")} style={{"--i": 2}}></div>
                <div className={cx("square")} style={{"--i": 3}}></div>
                <div className={cx("square")} style={{"--i": 4}}></div>
                <div className={cx("container")}>
                    <div className={cx("form")}>
                        <h2>Login Form</h2>
                        <form>
                            <div className={cx("input-box")}>
                                <input type="text" placeholder="UserName"/>
                            </div>
                            <div className={cx("input-box")}>
                                <input type="password" placeholder="Password"/>
                            </div>
                            <div className={cx("input-box")}>
                                <input type="submit" value="Login"/>
                            </div>
                            <p className={cx('forget')}>Foget Password <a href="#">Click here</a></p>
                            <p className={cx('forget')}>Don't have an account?
                                <a href="#">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;