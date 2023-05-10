import React from "react";
import {atomWithStorage} from "jotai/utils";

// Jotai
export const UserAtom = atomWithStorage('user', {username: 'guest', status: 'guest', uid: '0', token: ''})