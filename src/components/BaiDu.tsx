import React from "react";
import { Input } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import './baidu.less';

function Baidu() {
    return (
        <div className="baidu">
            <div className="logo">
                <img
                    src="https://www.baidu.com/img/PC_880906d2a4ad95f5fafb2e540c5cdad7.png"
                    alt="百度"
                    width="270"
                    height="129"
                />
            </div>
            <div>
                <Input suffix={<IconSearch />} showClear></Input>
            </div>
        </div>
    )
}

export default Baidu;