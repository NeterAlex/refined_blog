import React, {forwardRef} from 'react';
import {Avatar, Group, Menu, Skeleton, UnstyledButton, useMantineColorScheme} from '@mantine/core';
import {IconDashboard, IconLogin, IconLogout, IconMoon, IconSettings, IconSun, IconUserPlus} from "@tabler/icons-react";
import {useRouter} from "next/router";
import {useUser} from "@/hooks/Request";
import {UserAtom} from "@/store/User";
import {useAtom} from "jotai";

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    image: string;
    nickname: string;
    email: string;
    icon?: React.ReactNode;
}

// eslint-disable-next-line react/display-name
const UserAvatar = forwardRef<HTMLButtonElement, UserButtonProps>(
    ({image, nickname, email, icon, ...others}: UserButtonProps, ref) => (
        <UnstyledButton
            ref={ref}
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            })}
            {...others}
        >
            <Group>
                <Avatar src={image} radius="xl"/>
            </Group>
        </UnstyledButton>
    )
)


export default function UserMenu() {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const router = useRouter()
    const [currentUser, setCurrentUser] = useAtom(UserAtom)
    const {user, error, isLoading} = useUser(currentUser.uid)

    if (isLoading) {
        return (
            <Skeleton w={"10P0%"} height={"100%"} radius="xl" animate={true}/>
        )
    }

    if (error) {
        return (
            <Group position="center">
                <Menu withArrow>
                    <Menu.Target>
                        <UserAvatar email={""} image={''} nickname={"Guest"}/>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>{currentUser.uid === '0' ? 'Guest' : user.users.nickname}</Menu.Label>
                        <Menu.Item icon={colorScheme === 'light' ? <IconMoon size={14}/> : <IconSun size={14}/>} onClick={() => toggleColorScheme()}>
                            {colorScheme === 'light' ? '夜间模式' : '日间模式'}
                        </Menu.Item>
                        <Menu.Divider/>
                        <Menu.Label>管理</Menu.Label>
                        <Menu.Item icon={<IconLogin size={14}/>} onClick={() => router.replace('/auth/login')}>登录</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        )
    }

    return (

        <Group position="center">
            <Menu withArrow>
                <Menu.Target>
                    <UserAvatar email={""} image={currentUser.uid !== '0' ? `http://localhost:8022/static/avatar/${currentUser.uid}.jpg` : ''} nickname={""}/>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>{currentUser.uid === '0' ? 'Guest' : user.users.nickname}</Menu.Label>
                    {
                        currentUser.uid !== '0' ? <Menu.Item icon={<IconSettings size={14}/>} onClick={() => router.push(`/user/edit`)}>设置</Menu.Item> : <></>
                    }

                    <Menu.Item icon={colorScheme === 'light' ? <IconMoon size={14}/> : <IconSun size={14}/>} onClick={() => toggleColorScheme()}>
                        {colorScheme === 'light' ? '夜间模式' : '日间模式'}
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Label>管理</Menu.Label>
                    {
                        user.users.ID === 1 && currentUser.uid === '1' ? (
                            <Menu.Item icon={<IconDashboard size={14}/>} onClick={() => router.push('/admin/dashboard')}>管理面板</Menu.Item>
                        ) : (<></>)
                    }
                    {
                        currentUser.token !== '' ?
                            <Menu.Item onClick={() => {
                                setCurrentUser({username: 'guest', status: 'guest', uid: '0', token: ''})
                                router.reload()
                            }} icon={<IconLogout size={14}/>}>退出登录</Menu.Item> :
                            <Menu.Item onClick={() => router.push('/auth/login')} icon={<IconLogin size={14}/>}>登录</Menu.Item>

                    }
                    {
                        currentUser.token !== '' ?
                            <></> :
                            <Menu.Item onClick={() => router.push('/auth/register')} icon={<IconUserPlus size={14}/>}>注册</Menu.Item>
                    }

                </Menu.Dropdown>
            </Menu>
        </Group>

    )
}