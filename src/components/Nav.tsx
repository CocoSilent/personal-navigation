import React from "react";
import styles from './nav.module.less';

const navs = [
    {
        favicon: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/favicon-32x32.png',
        url: 'https://juejin.cn/',
        name: '掘金',
    }
]

function Nav() {
    return (
        <div className={styles.nav}>
            <div className={styles.navContent}>
                {
                    navs.map((nav, index) => {
                        return (
                            <div key={index}>
                                {nav.url}
                            </div>)
                    })
                }
            </div>
        </div>
    )
}

export default Nav
