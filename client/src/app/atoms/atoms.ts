import { atom } from "jotai";

export const Seen = atom<Boolean>(false);
export const showComments = atom<Boolean>(false);
export const comments = atom<Array<any>>([]);