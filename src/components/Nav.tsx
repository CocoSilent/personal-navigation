import React, {useState} from "react";
import {IconEdit, IconDelete} from '@douyinfe/semi-icons';
import styles from './nav.module.less';
import {Tooltip} from "@douyinfe/semi-ui";

const navs = [
    {
        favicon: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/favicon-32x32.png',
        url: 'https://juejin.cn/',
        name: '掘金',
        optionVisible: false,
    },
    {
        favicon: 'https://github.com/favicon.ico',
        url: 'https://github.com/',
        name: 'github',
        optionVisible: false,
    },
    {
        favicon: 'https://static.zhihu.com/heifetz/favicon.ico',
        url: 'https://www.zhihu.com/',
        name: '知乎',
        optionVisible: false,
    },
    {
        favicon: 'https://leetcode-cn.com/favicon.ico',
        url: 'https://leetcode-cn.com/',
        name: '力扣',
        optionVisible: false,
    },
    {
        favicon: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
        url: 'https://www.csdn.net/',
        name: 'CSDN',
        optionVisible: false,
    },
    {
        favicon: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
        url: 'https://www.csdn.net/',
        name: 'CSDN',
        optionVisible: false,
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
                                <Tooltip className={styles.toolTip}
                                    content={
                                        <div className={styles.options}>
                                            <div>
                                                <IconEdit className={styles.icon} size="small"/>
                                            </div>
                                            <div>
                                                <IconDelete className={styles.icon} size="small"/>
                                            </div>
                                        </div>
                                    }
                                    position="rightTop"
                                >
                                    <div
                                        className={styles.content}
                                    >
                                        <img width='32px' height='32px' src={nav.favicon} onClick={() => {
                                            window.open(nav.url);
                                        }}/>
                                        <div onClick={() => {
                                            window.open(nav.url);
                                        }}>{nav.name}</div>
                                    </div>
                                </Tooltip>
                            </div>)
                    })
                }
            </div>
        </div>
    )
}

export default Nav
