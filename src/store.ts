import create from "zustand";
import { languageOptions } from "../shared/data";


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

interface chooseLanguageState  {
    chooseLanguage: boolean;
    setChooseLanguage: (value: boolean) => void;
};

export const chooseLanguageStore = create<chooseLanguageState>((set)=>({
    chooseLanguage: false,
    setChooseLanguage: (value) => set({chooseLanguage: value}),
}))

interface InitialDeleteState {
    initialDelete: boolean;
    setInitialDelete: (value: boolean) => void;
    postIdToDelete: string | null;
    setPostIdToDelete: (id: string | null) => void;
  }
  
  export const initialDeleteStore = create<InitialDeleteState>((set) => ({
    initialDelete: false,
    setInitialDelete: (value) => set({ initialDelete: value }),
    postIdToDelete: null,
    setPostIdToDelete: (id) => set({ postIdToDelete: id }),
  }));

  type LanguageOption = {
    code: string;
    label: string;
    flag: string;
  };
  
  type LanguageState = {
    selectedLanguage: LanguageOption;
    setSelectedLanguage: (language: LanguageOption) => void;
    languageOptions: LanguageOption[];
  };
  
  export const useLanguageStore = create<LanguageState>((set) => ({
    selectedLanguage: languageOptions[0], 
    setSelectedLanguage: (language) => set({ selectedLanguage: language }),
    languageOptions: languageOptions, 
  }));

  type ActiveTabType = {
    activeTab: string
    setActiveTab: (value: string) => void;
  }

  export const activeTabStore = create<ActiveTabType>((set)=>({
    activeTab: "band",
    setActiveTab: (value) => set({activeTab: value})
  }))

  type ProfessionType = {
    selectedProfession: string
    setSelectedProfession: (value: string) => void;
  }

  export const useInstrumentListStore = create<ProfessionType>((set)=>({
    selectedProfession: "All",
    setSelectedProfession: (value: string) => set({selectedProfession: value})
  }))