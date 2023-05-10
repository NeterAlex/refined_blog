import NavSidebar from "@/components/nav/NavSidebar";
import {Button, Overlay} from "@mantine/core";
import {usePermissionChecker} from "@/hooks/Token";
import {useRouter} from "next/router";


export default function AdminLayout({children}: any) {
    const router = useRouter()
    const {result, isLoading, error} = usePermissionChecker()


    if (error || isLoading) {

    }

    if (result?.message !== 'admin') {
        return (
            <>
                {
                    result?.message !== 'admin' && <Overlay blur={15} center>
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