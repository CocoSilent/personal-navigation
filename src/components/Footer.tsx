import React from "react";
import styles from './footer.module.less';

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.wrap}>
                <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">浙ICP备2022004306号-1</a>
            </div>
        </div>
    )
}

export default Footer;
