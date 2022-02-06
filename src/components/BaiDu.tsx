import React from "react";
import styles from './baidu.less';

console.log(789, styles);

function Baidu() {
    return (
        <div className={styles.baidu}>
            <div className={styles.logo}>
                <img
                    src="https://www.baidu.com/img/PC_880906d2a4ad95f5fafb2e540c5cdad7.png"
                    alt="百度"
                    width="270"
                    height="129"
                />
            </div>
            <div>

            </div>
        </div>
    )
}

export default Baidu;