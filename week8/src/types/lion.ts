export interface Lion {
    id: number;
    name: string;
    part: 'Frontend' | 'Backend' | 'Design';
    shortIntro: string;
    skills: string[];
    intro: string;
    email: string;
    phone: string;
    website: string;
    lastword: string;
    isMe: boolean;
    seed: string;
  }
  
  export type Part = 'Frontend' | 'Backend' | 'Design';
  export type SortType = 'latest' | 'name';
  export type FetchStatus = 'ready' | 'loading' | 'success' | 'error';
  
  export interface FormData {
    name: string;
    part: Part;
    shortIntro: string;
    skills: string;
    intro: string;
    email: string;
    phone: string;
    website: string;
    lastword: string;
  }
  
  export interface RandomUserResult {
    name: { first: string; last: string };
    location: { city: string };
    login: { username: string };
    email: string;
    phone: string;
  }
  
  export interface RandomUserApiResponse {
    results: RandomUserResult[];
  }
  
  export interface ViewOptions {
    part: string;
    search: string;
    sort: SortType;
  }