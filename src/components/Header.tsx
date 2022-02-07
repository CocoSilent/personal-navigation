import React, { useState } from "react";
import { Button } from '@douyinfe/semi-ui';
import { getApp } from '../tcb'

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
        <div style={{ height: '20px' }}>
            <Button onClick={callFunction}>调用云函数</Button>
            <p>
                <b>云函数执行结果</b>
            </p>
            <p>{callFunctionResult}</p>
        </div>
    )
}

export default Header;