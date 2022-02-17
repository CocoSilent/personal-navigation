import React, {useState, useEffect} from "react";
import {IconEdit, IconDelete} from '@douyinfe/semi-icons';
import styles from './nav.module.less';
import {Tooltip, Modal, Input} from "@douyinfe/semi-ui";

const defaultNavs = {
    name: '我的网址',
    navs: [
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
}

enum OptionType {
    add = 1,
    delete = 2,
    modify = 3,
}

type Option = {
    title?:string,
    visible?:boolean,
    type?:OptionType,
}

function Nav() {
    const [groups, setGroups] = useState([defaultNavs]);

    const [option, setOption] = useState<Option>({});

    useEffect(() => {
        // setGroups([defaultNavs, defaultNavs]);
    }, [])

    return (
        <div className={styles.nav}>
            {
                groups.map(group => {
                    return (
                        <>
                            <div className={styles.navName}>{group.name}</div>
                            <div className={styles.navContent}>
                                {
                                    group.navs.map((nav, index) => {
                                        return (
                                            <div key={index} className={styles.navItem}>
                                                <Tooltip className={styles.toolTip}
                                                         content={
                                                             <div className={styles.options}>
                                                                 <div>
                                                                     <IconEdit
                                                                         className={styles.icon}
                                                                         size="small"
                                                                         onClick={() => setOption({
                                                                             title: '修改',
                                                                             visible: true,
                                                                             type: OptionType.modify,
                                                                         })}
                                                                     />
                                                                 </div>
                                                                 <div>
                                                                     <IconDelete
                                                                         className={styles.icon}
                                                                         size="small"
                                                                         onClick={() => setOption({
                                                                             title: '删除',
                                                                             visible: true,
                                                                             type: OptionType.delete
                                                                         })}
                                                                     />
                                                                 </div>
                                                             </div>
                                                         }
                                                         position="rightTop"
                                                         mouseEnterDelay={1000}
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
                        </>
                    )
                })
            }
            <Modal
                title={option.title}
                visible={option.visible}
                onCancel={() => {setOption({visible:false})}}
                className="optionModal"
            >
                {
                    option.type === OptionType.modify &&
                        <>
                            <Input prefix="分组名称:" placeholder="分组名称" showClear></Input>
                            <br/><br/>
                            <Input prefix="网站地址:" placeholder="请输入网站地址" showClear></Input>
                            <br/><br/>
                            <Input prefix="图标地址:" placeholder="默认为网站根目录favicon" showClear></Input>
                        </>
                }
            </Modal>
        </div>
    )
}

export default Nav
