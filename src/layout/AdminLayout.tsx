import NavSidebar from "@/components/nav/NavSidebar";
import {Button, Overlay} from "@mantine/core";
import {useRouter} from "next/router";
import {useAtom} from "jotai/index";
import {UserAtom} from "@/store/User";


export default function AdminLayout({children}: any) {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useAtom(UserAtom)
    const result = currentUser.status

    if (result !== 'admin') {
        return (
            <>
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