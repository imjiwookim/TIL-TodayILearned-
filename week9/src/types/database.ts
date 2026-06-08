export type Database = {
    public: {
      Tables: {
        lions: {
          Row: {
            id: number;
            name: string;
            part: string;
            short_intro: string;
            skills: string[];
            intro: string | null;
            email: string | null;
            phone: string | null;
            website: string | null;
            lastword: string | null;
            is_me: boolean;
            seed: string;
          };
          Insert: {
            name: string;
            part: string;
            short_intro: string;
            skills: string[];
            intro?: string | null;
            email?: string | null;
            phone?: string | null;
            website?: string | null;
            lastword?: string | null;
            is_me?: boolean;
            seed: string;
          };
          Update: {
            name?: string;
            part?: string;
            short_intro?: string;
            skills?: string[];
            intro?: string | null;
            email?: string | null;
            phone?: string | null;
            website?: string | null;
            lastword?: string | null;
            is_me?: boolean;
            seed?: string;
          };
        };
      };
    };
  };