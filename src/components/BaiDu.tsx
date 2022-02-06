import React, { useState } from "react";
import { Input, Button } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import styles from './baidu.module.less';

function Baidu() {
    const [searchText, setSearchText] = useState('');
    function search() {
        if(!searchText) {
            return;
        }
        window.open(`https://www.baidu.com/s?wd=${searchText}`);
    }
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
            <div className={styles.search}>
                <Input
                    autofocus
                    className={styles.input}
                    suffix={<Button type="primary" theme="light" icon={<IconSearch style={{ color:"#4e6ef2" }} />} aria-label="搜索" onClick={search}/>}
                    showClear
                    size="large"
                    value={searchText}
                    onChange={setSearchText}
                    onEnterPress={search}
                ></Input>
            </div>
        </div>
    )
}

export default Baidu;