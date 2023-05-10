import jwtDecode from "jwt-decode";
import {Token} from "@/common/types";
import useSWR from "swr";

export function useDecodedToken(token: string) {
    let invalid = token === '' || token === '0'
    let decodedToken: Token = jwtDecode<Token>(token)
    return {decodedToken, invalid}
}

export function usePermissionChecker() {
    const {data, error, isLoading} = useSWR('/user/trig')
    return {result: data, isLoading, error}
}