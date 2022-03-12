import React, { useState } from "react";
import { Button, Tooltip } from '@douyinfe/semi-ui';
import { IconGithubLogo, IconHelpCircle, IconImage } from '@douyinfe/semi-icons';
// import { getApp } from '../tcb'
import { GITHUB_PROJECT } from '../common/constant';

import styles from './header.module.less';

// const app = getApp();

function Header() {

    // const [callFunctionResult, setCallFunctionResult] = useState("");
    //
    // const callFunction = async () => {
    //     try {
    //         const res = await app.callFunction({
    //             name: "helloworld",
    //             data: {
    //                 foo: "bar",
    //             },
    //         });
    //         setCallFunctionResult(JSON.stringify(res));
    //     } catch (e: any) {
    //         setCallFunctionResult(e.message);
    //     }
    // };

    return (
        <div className={styles.header}>
            <div style={{ textAlign: "right", paddingRight: '32px' }}>
                {/*<Tooltip content="切换皮肤">*/}
                {/*    <Button  size="default" icon={<IconImage size="large" style={{ color: "green"}} />}*/}
                {/*             style={{marginLeft: 8}}*/}
                {/*             onClick={() => window.open(GITHUB_PROJECT)} />*/}
                {/*</Tooltip>*/}
                <Tooltip content="鼠标放到网站图标上停留1秒以上就可以新增、修改、删除网站了~" position="leftBottom">
                    <Button  icon={<IconHelpCircle size="large" style={{ color: "black"}} />}
                             style={{marginLeft: 8}} />
                </Tooltip>
                <Tooltip content="项目详情">
                    <Button  icon={<IconGithubLogo size="large" style={{ color: "black"}} />}
                            style={{marginLeft: 8}}
                            onClick={() => window.open(GITHUB_PROJECT)} />
                </Tooltip>
            </div>
        </div>
    )
}

export default Header;
