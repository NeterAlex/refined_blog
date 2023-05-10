import useSWR from "swr";
import useSWRMutation from 'swr/mutation'
import axios from "axios";
import qs from "querystring";
import {NotificationProps, notifications} from "@mantine/notifications";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {UserAtom} from "@/store/User";

// Mutations

export function useViewIncrease(pid: string) {
    const {trigger} = useSWRMutation(`/v1/post/view/${pid}`, () => {
        axios.get(`/v1/post/view/${pid}`)
    })
    return {trigViewIncrease: trigger}
}

export function useTokenDelete(key: string, success: NotificationProps) {
    const [currentUser, setCurrentUser] = useAtom(UserAtom)
    const router = useRouter()
    const {trigger} = useSWRMutation(key, () => {
        axios.delete(key, {
            headers: {
                'Authorization': `Bearer ${currentUser.token}`
            }
        }).catch(e => {
            if (e.response.status === 401) {
                notifications.show({title: '登录失效', message: '请重新登录', color: 'red'})
                router.push('/auth/login')
                return Promise.reject('Token expired')
            } else {
                notifications.show({title: '网络请求失败', message: e.response.message, color: 'red'})
                return Promise.reject('Request failed')
            }
        }).then((r) => {
            notifications.show(success)
        })
    })
    return {trigTokenDelete: trigger}
}

export function useTokenUpdate(key: string, data: any, success: NotificationProps) {
    const [currentUser, setCurrentUser] = useAtom(UserAtom)
    const router = useRouter()
    const {trigger} = useSWRMutation(key, () => {
        axios.put(key, qs.stringify(data), {
            headers: {
                'Authorization': `Bearer ${currentUser.token}`
            }
        }).catch(e => {
            if (e.response.status === 401) {
                notifications.show({title: '登录失效', message: '请重新登录', color: 'red'})
                router.push('/auth/login')
                return Promise.reject('Token expired')
            } else {
                notifications.show({title: '网络请求失败', message: e.response.message, color: 'red'})
                return Promise.reject('Request failed')
            }
        }).then((r) => {
            notifications.show(success)
        })
    })
    return {trigTokenUpdate: trigger}
}

export function useTokenRequest(key: string, data: any, success: NotificationProps) {
    const [currentUser, setCurrentUser] = useAtom(UserAtom)
    const router = useRouter()
    const {trigger} = useSWRMutation(key, () => {
        axios.post(key, qs.stringify(data), {
            headers: {
                'Authorization': `Bearer ${currentUser.token}`
            }
        }).catch(e => {
            if (e.response.status === 401) {
                notifications.show({title: '登录失效', message: '请重新登录', color: 'red'})
                router.push('/auth/login')
                return Promise.reject('Token expired')
            } else {
                notifications.show({title: '网络请求失败', message: e.response.message, color: 'red'})
                return Promise.reject('Request failed')
            }
        }).then((r) => {
            notifications.show(success)
        })
    })
    return {trigTokenRequest: trigger}
}

// Queries

export function useBasicUser(uid: string) {
    const {data, error, isLoading} = useSWR(`/user/${uid}/basic`)
    return {user: data, isLoading, error}
}

export function useUser(uid: string) {
    const {data, error, isLoading} = useSWR(`/v1/user/query/?page=1&page_size=1&id=${uid}`)
    return {user: data, isLoading, error}
}

export function useAllPosts() {
    const {data, error, isLoading} = useSWR('/v1/post/query/?id=0&page=1&page_size=1000')
    return {posts: data, isLoading, error}
}

export function usePost(pid: string) {
    const {data, error, isLoading} = useSWR(`/v1/post/query/?id=${pid}&page=1&page_size=1`)
    return {post: data, isLoading, error}
}

export function usePostList(index: number, size: number) {
    const {data, isLoading, error} = useSWR(`/v1/post/query/?id=0&page=${index}&page_size=${size}`)
    return {posts: data, isLoading, error}
}

export function usePostWithComment(pid: string) {
    const {data, error, isLoading} = useSWR(`/api/v1/post/${pid}/all`)
    return {post: data, isLoading, error}
}

export function useAllUsers() {
    const {data, error, isLoading} = useSWR('v1/user/query/?page=1&page_size=1000&id=0')
    return {users: data, isLoading, error}
}

export function usePostLatest() {
    const {data, isLoading, error} = useSWR(`/v1/post/query/latest`)
    return {latest: data, isLoading, error}
}

export function useStatCounts() {
    const {data, isLoading, error} = useSWR(`/v1/stat/query`)
    return {stat: data, isLoading, error}
}