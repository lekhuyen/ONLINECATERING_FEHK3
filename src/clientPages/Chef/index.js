import React from "react";

import { images } from "../../constants";
import "./Chef.css";
import SubHeading from "../../components/Layout/DefaultLayout/SubHeading/Index";

const Chef = () => (
    <div className="app__bg app__wrapper section__padding">
        <div className="app__wrapper_img app__wrapper_img-reverse">
            <img src={images.cheff} alt="chef_image" />
        </div>
        <div className="app__wrapper_info">
            <SubHeading title="Chef's word" />
            <h1 className="headtext__cormorant">What we believe in</h1>

            <div className="app__chef-content">
                <div className="app__chef-content_quote">
                    <img src={images.quote} alt="quote_image" />
                    <p className="p__opensans">
                        Cooking is love made visible
                    </p>
                </div>
                <p className="p__opensans">
                    {" "}
                    Behind every dish lies a story of passion and creativity, where flavors blend harmoniously to evoke memories and stir emotions, 
                    making every meal a journey worth savoring.{" "}
                </p>
            </div>

            {/* <div className="app__chef-sign">
                <p>Kevin Luo</p>
                <p className="p__opensans">Chef & Founder</p>
                <img src={images.sign} alt="sign_image" />
            </div> */}
        </div>
    </div>
);

export default Chef;
