import {Page} from "@/common/types";
import {useRouter} from "next/router";
import {useUser} from "@/hooks/Request";
import {Container, rem, Skeleton} from "@mantine/core";
import UserEditor from "@/components/user/UserEditor";
import {animated, useSpring} from "@react-spring/web";
import {UserAtom} from "@/store/User";
import {useAtom} from "jotai";
import {notifications} from "@mantine/notifications";

const UserPage: Page = () => {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useAtom(UserAtom)
    const {user, isLoading, error} = useUser(currentUser.uid)


    const springs = useSpring({
        from: {y: -70, opacity: 0},
        to: {y: 0, opacity: 1},
    })

    if (isLoading || error) {
        return (
            <Container py={rem(50)}>
                <Skeleton h={300} animate={true}/>
            </Container>
        )
    }

    if (currentUser.uid === '0') {
        notifications.show({title: '未登录', message: '将跳转到首页', color: 'indigo'})
        router.push('/')
    }

    return (
        <animated.div style={springs}>
            <UserEditor uid={user.data.list.ID} nickname={user.data.list.nickname} email={user.data.list.email} username={user.data.list.username}/>
        </animated.div>

    )
}
export default UserPage
UserPage.Layout = 'Main'