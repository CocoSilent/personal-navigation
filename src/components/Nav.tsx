import React from "react";
import styles from './nav.module.less';

const navs = [
    {
        favicon: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/favicon-32x32.png',
        url: 'https://juejin.cn/',
        name: '掘金',
    },
    {
        favicon: 'https://github.com/favicon.ico',
        url: 'https://github.com/',
        name: 'github',
    },
    {
        favicon: 'https://static.zhihu.com/heifetz/favicon.ico',
        url: 'https://www.zhihu.com/',
        name: '知乎',
    },
    {
        favicon: 'https://leetcode-cn.com/favicon.ico',
        url: 'https://leetcode-cn.com/',
        name: '力扣',
    },
    {
        favicon: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
        url: 'https://www.csdn.net/',
        name: 'CSDN',
    },
]

function Nav() {
    return (
        <div className={styles.nav}>
            <div className={styles.navContent}>
                {
                    navs.map((nav, index) => {
                        return (
                            <div key={index} className={styles.navItem}>
                                <img src={nav.favicon}  onClick={() => {window.open(nav.url);}}/>
                                <div onClick={() => {window.open(nav.url);}}>{nav.name}</div>
                            </div>)
                    })
                }
            </div>
        </div>
    )
}

export default Nav
