import {Anchor, Box, Button, Container, Paper, PasswordInput, Text, TextInput, Title,} from '@mantine/core';
import {useRouter} from "next/router";
import React, {useState} from "react";
import {hasLength, isNotEmpty, useForm} from "@mantine/form";
import axios from "axios";
import qs from "querystring"
import {notifications} from "@mantine/notifications";
import jwtDecode from "jwt-decode";
import {Page} from "@/common/types";
import {UserAtom} from "@/store/User";
import {useAtom} from "jotai";
// @ts-ignore
import ReactCaptchaa from "@/utils/captcha/captcha"

interface JWTInfo {
    exp: string
    orig_iat: string
    uid: string
    username: string
    status: string
}

const LoginPage: Page = () => {
    const router = useRouter()
    const [mode, setMode] = useState("username")

    const [currentUser, setCurrentUser] = useAtom(UserAtom)

    const [captcha, setCaptcha] = useState('')
    const [captchaValue, setCaptchaValue] = useState('')
    const form = useForm({
        initialValues: {username: '', password: ''},
        validate: {
            username: isNotEmpty('账号或邮箱不可为空'),
            password: hasLength({min: 6, max: 18}, '密码必须在6-18位')
        }
    })

    return (
        <Container size={420} mt={120}>
            <Title align="center" sx={(theme: any) => ({fontFamily: `${theme.fontFamily}`, fontWeight: 900})}>
                欢迎
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                还没有账号？{' '}
                <Anchor size="sm" component="button" onClick={() => router.push('/auth/register')}>注册</Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md" component="form" onSubmit={form.onSubmit((data) => {
                axios.post('/v1/auth/login', qs.stringify(data), {}).catch(e => {
                    if (e.response.status === 401) {
                        notifications.show({title: '登录错误', message: '用户与密码不匹配', color: 'red'})
                        return Promise.reject('Failed to login')
                    } else {
                        notifications.show({title: '登录错误', message: e.response.message, color: 'red'})
                        return Promise.reject('Failed to login')
                    }
                }).then((r) => {
                    notifications.show({title: '登陆成功', message: '即将跳转至首页', color: 'green'})
                    const user: JWTInfo = jwtDecode(r.data.token)
                    setCurrentUser({username: user.username, uid: user.uid, status: user.status, token: r.data.token})
                    router.push('/')
                })
            })}>
                {/*<SegmentedControl fullWidth value={mode} onChange={setMode} data={[{label: '用户名', value: 'username'}, {label: '邮箱', value: 'email'}]}/>*/}
                <TextInput mt="md" label={mode === 'email' ? "电子邮件" : "用户名"} placeholder={mode === 'email' ? "account@example.com" : "用户名"} required
                           withAsterisk {...form.getInputProps('username')}/>
                <PasswordInput label="密码" placeholder="密码" required mt="md" withAsterisk {...form.getInputProps('password')}/>
                <TextInput width={'100%'} rightSection={
                    <Box pr={75}>
                        <ReactCaptchaa captchaText={(code: any) => setCaptcha(code)} captchaLength={4}
                                       height={30} width={80} fontSize={'1em'}
                                       charactersInclude={"0123456789abcdefghijklmnopqrstuvwxzABCDEFGHIJKLMNOPQRSTUVWXYZ"}
                                       containerClassName={'react-captcha'}
                                       iconWrapperClassName={'react-captcha-icon-wrapper'}
                                       canvasClassName={'react-captcha-canvas'}
                                       iconClassName={'react-captcha-icon'}/>
                    </Box>
                }
                           mt="md" label={"验证码"} placeholder={'验证码(大小写敏感)'}
                           value={captchaValue} onChange={(e) => setCaptchaValue(e.currentTarget.value)} required/>
                <Button disabled={captcha !== captchaValue} fullWidth mt="xl" type="submit">
                    登录
                </Button>
            </Paper>
        </Container>
    )
        ;
}

export default LoginPage
LoginPage.Layout = 'Main'