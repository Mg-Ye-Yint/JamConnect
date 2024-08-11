import create from "zustand";


interface AttemptState  {
    loginAttempt: boolean;
    setLoginAttempt: (value: boolean) => void;
};


export const attemptStore = create<AttemptState>((set)=>({
 loginAttempt: false,
 setLoginAttempt: (value) => set({loginAttempt: value}),
}))

interface ModalState  {
    modal: boolean;
    setModal: (value: boolean) => void;
};

export const modalStore = create<ModalState>((set)=>({
 modal: false,
 setModal: (value) => set({modal: value}),
}))