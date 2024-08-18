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

interface InitialSessionDeleteState {
    initialSessionDelete: boolean;
    setInitialSessionDelete: (value: boolean) => void;
    sessionPostIdToDelete: string | null;
    setSessionPostIdToDelete: (id: string | null) => void;
  }
  
  export const initialSessionDeleteStore = create<InitialSessionDeleteState>((set) => ({
    initialSessionDelete: false,
    setInitialSessionDelete: (value) => set({ initialSessionDelete: value }),
    sessionPostIdToDelete: null,
    setSessionPostIdToDelete: (id) => set({ sessionPostIdToDelete: id }),
  }));

  interface InitialBandDeleteState {
    initialBandDelete: boolean;
    setInitialBandDelete: (value: boolean) => void;
    bandPostIdToDelete: string | null;
    setBandPostIdToDelete: (id: string | null) => void;
  }
  
  export const initialBandDeleteStore = create<InitialBandDeleteState>((set) => ({
    initialBandDelete: false,
    setInitialBandDelete: (value) => set({ initialBandDelete: value }),
    bandPostIdToDelete: null,
    setBandPostIdToDelete: (id) => set({ bandPostIdToDelete: id }),
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