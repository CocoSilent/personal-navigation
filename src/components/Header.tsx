import React, { useState } from "react";
import { Button, Tooltip } from '@douyinfe/semi-ui';
import { IconGithubLogo, IconImage } from '@douyinfe/semi-icons';
import { getApp } from '../tcb'
import { GITHUB_PROJECT } from '../common/constant';

import styles from './header.module.less';

const app = getApp();

function Header() {

    const [callFunctionResult, setCallFunctionResult] = useState("");

    const callFunction = async () => {
        try {
            const res = await app.callFunction({
                name: "helloworld",
                data: {
                    foo: "bar",
                },
            });
            setCallFunctionResult(JSON.stringify(res));
        } catch (e: any) {
            setCallFunctionResult(e.message);
        }
    };

    return (
        <div className={styles.header}>
            <div style={{ textAlign: "right", paddingRight: '32px' }}>
                <Tooltip content="切换皮肤">
                    <Button  size="small" icon={<IconImage style={{ color: "black"}} />}
                             style={{marginLeft: 8}}
                             onClick={() => window.open(GITHUB_PROJECT)} />
                </Tooltip>
                <Tooltip content="项目详情">
                    <Button  size="small" icon={<IconGithubLogo style={{ color: "black"}} />}
                            style={{marginLeft: 8}}
                            onClick={() => window.open(GITHUB_PROJECT)} />
                </Tooltip>
            </div>
        </div>
    )
}

export default Header;
