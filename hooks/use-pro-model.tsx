import {create} from "zustand";

interface useProModelStore {
    isopen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
};

export const useProModel =create <useProModelStore>((set)=>({
    isopen:false,
    onOpen:() => set({isopen:true}),
    onClose:()=> set({isopen:false}),
}))