import axios, { AxiosResponse } from 'axios';
import { Toast } from '@douyinfe/semi-ui';

const instance = axios.create({
    xsrfCookieName: 'csrfToken',
    xsrfHeaderName: 'x-csrf-token',
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
});

const handError = (error: any) => {
    return Promise.reject(error);
};


instance.interceptors.response.use((response: AxiosResponse) => {
    if (response.data.head.code !== '00000000') {
        if (!response.config.catch) {
            Toast.error(response.data.head.msg || '网络异常，请稍候重试');
        }
        return Promise.reject(response);
    }
    return response.data;
}, handError);


export default instance;
