import {LayoutKeys} from "@/layout/LayoutProvider";
import {NextComponentType, NextPage, NextPageContext} from "next";
import {AppProps} from "next/app";

export type Page<P = {}, IP = P> = NextPage<P, IP> & {
    Layout?: LayoutKeys;
}
export type RefinedAppProps = AppProps & {
    Component: NextComponentType<NextPageContext, any, any> & {
        Layout: LayoutKeys;
    };
};

export interface Token {
    exp: string
    orig_iat: string
    status: string
    uid: string
    username: string
}

export interface User {
    username: string
    uid: string
    status: string
    token: string
}