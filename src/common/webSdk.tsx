import React from "react";
import { getCookie, setCookie } from './utils';
import { OPENIDKEY } from './constant';
import { Modal, Input, Toast } from "@douyinfe/semi-ui";
import "./websdk.less";

const myCloud:any = new window.cloud.Cloud({
    appid: 'wx56f18e2958172116',
    // 必填，表示是未登录模式
    identityless: true,
    // 资源方 AppID
    resourceAppid: 'wx027c26a5366185b9',
    // 资源方环境 ID
    resourceEnv: 'diablo-ugsbd',
})

// 跨账号调用，必须等待 init 完成
// init 过程中，资源方小程序对应环境下的 cloudbase_auth 函数会被调用，并需返回协议字段（见下）来确认允许访问、访问时长以及可自定义安全规则
myCloud.init().then(() => {
    window.myCloud = myCloud;
});

function checkAuth() {
    if (getCookie(OPENIDKEY)) {
        return true
    }
    let verifyCode = '';
    Modal.info({
        title: '关注公众号',
        width: 380,
        content: <div>
            <div className="gzh">

            </div>
            <div>
                <Input onChange={(value) => verifyCode = value } placeholder="请输入验证码" />
            </div>
        </div>,
        onOk: () => {
            return new Promise(async (resolve, reject) => {
                if (!verifyCode) {
                    Toast.error('验证码不能为空！');
                    reject();
                    return
                }
                myCloud.callFunction({
                    name: 'web-login',
                    data: {
                        verifyCode
                    }
                }).then((res:any) => {
                    if (res?.result?.openId) {
                        setCookie(OPENIDKEY, res.result.openId, 30);
                        resolve(res.result.openId);
                    } else {
                        Toast.error('接口调用异常！');
                        reject();
                    }
                }).catch((err:any) => {
                    Toast.error('接口调用异常！');
                    reject();
                })
            })

        }
    });
    return false;
}

export default {
    checkAuth
}



