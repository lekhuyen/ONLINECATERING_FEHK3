import React from 'react';
import { DNA } from 'react-loader-spinner';
import styles from './Loading.module.scss'

const Loading = () => {
    return (
        <div className={styles.loading}>
            <DNA
                visible={true}
                height="50"
                width="50"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    );
};

export default Loading;