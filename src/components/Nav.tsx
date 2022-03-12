import React, {useState, useEffect, useCallback} from "react";
import {IconEdit, IconDelete, IconPlus} from '@douyinfe/semi-icons';
import styles from './nav.module.less';
import {Tooltip, Modal, Input, Toast, Switch, Typography} from "@douyinfe/semi-ui";

const {Title} = Typography;

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
            favicon: 'https://developer.mozilla.org/favicon-192x192.png',
            url: 'https://developer.mozilla.org/zh-CN/',
            name: 'MDN',
        },
        {
            favicon: 'https://leetcode-cn.com/favicon.ico',
            url: 'https://leetcode-cn.com/',
            name: '力扣',
        },

        {
            favicon: 'https://static.zhihu.com/heifetz/favicon.ico',
            url: 'https://www.zhihu.com/',
            name: '知乎',
        },
    ]
}

enum OptionType {
    add = 1,
    delete = 2,
    modify = 3,
}

type Option = {
    title: string,
    visible: boolean,
    type: OptionType,
}

type NavRecord = {
    groupIndex: number
    navIndex: number
    groupName: string,
    favicon: string,
    url: string,
    navName: string,
}

function Nav() {
    const [groups, setGroups] = useState([defaultNavs]);
    const saveGroups = useCallback((tmpGroups: Array<any>) => {
        setGroups(tmpGroups);
        localStorage.setItem('groups', JSON.stringify(tmpGroups));
    }, [])

    const [open, setOpen] = useState(false);
    const [option, setOption] = useState<Option>({
        title: '',
        visible: false,
        type: OptionType.modify,
    });

    const [navRecord, setNavRecord] = useState<NavRecord>({
        groupIndex: -1,
        navIndex: -1,
        groupName: '',
        favicon: '',
        url: '',
        navName: '',
    });

    // const [favicon, setFavicon] = useState('');
    // const [url, setUrl] = useState('');
    // const [navName, setNavName] = useState('');
    // const [groupName, setGroupName] = useState('');

    const onDelete = (groupIndex: number, navIndex: number) => {
        Modal.confirm({
            title: '确定删除' + groups[groupIndex].navs[navIndex].name + '吗？',
            onOk: () => {
                if (groups.length === 1 && groups[groupIndex].navs.length === 1) {
                    Toast.error('最后一个不能删除！');
                    return
                }
                groups[groupIndex].navs.splice(navIndex, 1);
                if (groups[groupIndex].navs.length === 0) {
                    groups.splice(groupIndex, 1);
                }
                saveGroups([...groups]);
            }
        })
    }

    const onOk = () => {
        if (!navRecord.url || !navRecord.navName) {
            Toast.error('网站地址和网站名称必须填写！');
            return
        }
        let currentGroup = groups[navRecord.groupIndex];
        if (option.type === OptionType.modify) {
            currentGroup.name = navRecord.groupName;
            const currentNav = currentGroup.navs[navRecord.navIndex];
            currentNav.favicon = navRecord.favicon;
            currentNav.url = navRecord.url;
            currentNav.name = navRecord.navName;
        } else {
            if (open) {
                currentGroup = {
                    name: navRecord.navName,
                    navs: [],
                }
                groups.push(currentGroup);
            }
            const currentNav = {
                favicon: navRecord.favicon,
                url: navRecord.url,
                name: navRecord.navName,
            }
            currentGroup.navs.push(currentNav);
        }
        setOpen(false);
        setOption({
            ...option,
            visible: false,
        })
        saveGroups([...groups])
    }

    useEffect(() => {
        const localGroups = localStorage.getItem('groups');
        if (localGroups) {
            setGroups(JSON.parse(localGroups));
        }
    }, [])

    return (
        <div className={styles.nav}>
            {
                groups.map((group, groupIndex) => {
                    return (
                        <>
                            <div className={styles.navName}>{group.name}</div>
                            <div className={styles.navContent}>
                                {
                                    group.navs.map((nav, navIndex) => {
                                        return (
                                            <div key={navIndex} className={styles.navItem}>
                                                <Tooltip className={styles.toolTip}
                                                         content={
                                                             <div className={styles.options}>
                                                                 <div>
                                                                     <IconPlus
                                                                         className={styles.icon}
                                                                         size="small"
                                                                         onClick={() => {
                                                                             setOption({
                                                                                 title: '新增',
                                                                                 visible: true,
                                                                                 type: OptionType.add,
                                                                             })
                                                                             setNavRecord({
                                                                                 groupIndex,
                                                                                 navIndex,
                                                                                 groupName: '',
                                                                                 favicon: '',
                                                                                 url: '',
                                                                                 navName: ''
                                                                             })
                                                                         }}
                                                                     />
                                                                 </div>
                                                                 <div>
                                                                     <IconEdit
                                                                         className={styles.icon}
                                                                         size="small"
                                                                         onClick={() => {
                                                                             setOption({
                                                                                 title: '修改',
                                                                                 visible: true,
                                                                                 type: OptionType.modify,
                                                                             })
                                                                             setNavRecord({
                                                                                 groupIndex,
                                                                                 navIndex,
                                                                                 groupName: group.name,
                                                                                 favicon: nav.favicon,
                                                                                 url: nav.url,
                                                                                 navName: nav.name
                                                                             })
                                                                         }}
                                                                     />
                                                                 </div>
                                                                 <div>
                                                                     <IconDelete
                                                                         className={styles.icon}
                                                                         size="small"
                                                                         onClick={() => onDelete(groupIndex, navIndex)}
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
                                                        <img width='32px' height='32px' src={nav.favicon}
                                                             onClick={() => {
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
                onCancel={() => {
                    setOption({
                        ...option,
                        visible: false,
                    })
                }}
                className="optionModal"
                width="40%"
                onOk={onOk}
            >
                {
                    (option.type === OptionType.modify || option.type === OptionType.add) &&
                    <>
                        {
                            option.type === OptionType.add &&
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '8px',
                                paddingLeft: '14px'
                            }}>
                                <Title heading={6} style={{}} disabled={!open}>
                                    新增分组
                                </Title>
                                <Switch checked={open} onChange={setOpen}/>
                            </div>
                        }
                        {
                            (option.type === OptionType.modify || open) &&
                            <>
                                <Input prefix="分组名称:" placeholder="请输入分组名称" showClear value={navRecord.groupName}
                                       onChange={
                                           (value => {
                                               setNavRecord({
                                                   ...navRecord,
                                                   groupName: value,
                                               })
                                           })
                                       }/>
                                <br/><br/>
                            </>
                        }
                        <Input prefix="网站地址:" placeholder="请输入网站地址" showClear value={navRecord.url} onChange={
                            (value => {
                                setNavRecord({
                                    ...navRecord,
                                    url: value,
                                })
                            })
                        }/>
                        <br/><br/>
                        <Input prefix="网站简称:" placeholder="请输入网站简称" showClear value={navRecord.navName} onChange={
                            (value => {
                                setNavRecord({
                                    ...navRecord,
                                    navName: value,
                                })
                            })
                        }/>
                        <br/><br/>
                        <Input prefix="图片地址:" placeholder="默认为网站根目录favicon" showClear value={navRecord.favicon} onChange={
                            (value => {
                                setNavRecord({
                                    ...navRecord,
                                    favicon: value,
                                })
                            })
                        }/>
                    </>
                }
            </Modal>
        </div>
    )
}

export default Nav
