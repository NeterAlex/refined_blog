import NavSidebar from "@/components/nav/NavSidebar";
import {Button, Overlay} from "@mantine/core";
import {useRouter} from "next/router";
import {useAtom} from "jotai/index";
import {UserAtom} from "@/store/User";
import Head from "next/head";
import React from "react";


export default function AdminLayout({children}: any) {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useAtom(UserAtom)
    const result = currentUser.status

    if (result !== 'admin') {
        return (
            <>
                <Head>
                    <title>Refined | 管理</title>
                </Head>
                {
                    result !== 'admin' && <Overlay blur={15} center>
                        <Button color="blue" radius="xl" onClick={() => router.push('/')}>
                            无管理权限，点击回到首页
                        </Button>
                    </Overlay>
                }
            </>
        )
    }

    return (
        <>
            <NavSidebar>
                {children}
            </NavSidebar>
        </>
    )
}