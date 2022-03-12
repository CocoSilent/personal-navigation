declare module '*.module.less' {
    const classes: { readonly [key: string]: string };
    export default classes;
}


declare interface Window {
    cloud: any;
    myCloud: any;
}
