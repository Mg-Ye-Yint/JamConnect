import create from "zustand";


interface AttemptState  {
    loginAttempt: boolean;
    setLoginAttempt: (value: boolean) => void;
};


export const attemptStore = create<AttemptState>((set)=>({
 loginAttempt: false,
 setLoginAttempt: (value) => set({loginAttempt: value}),
}))