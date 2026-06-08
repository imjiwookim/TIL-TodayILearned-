import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { convertUserToMember, rowToLion } from '../utils/convertUser';
import type { Lion, Part, RandomUserApiResponse } from '../types/lion';

const API_URL = 'https://randomuser.me/api/?results=NUMBER&nat=us,gb,ca,au,nz';

interface AddMemberData {
  name: string;
  part: Part;
  shortIntro: string;
  skills: string[];
  intro: string;
  email: string;
  phone: string;
  website: string;
  lastword: string;
}

interface UseLionsReturn {
  members: Lion[];
  isLoading: boolean;
  addMember: (formData: AddMemberData) => Promise<void>;
  deleteLastMember: () => Promise<void>;
  fetchAndAdd: (count: number) => Promise<void>;
  fetchAndRefresh: () => Promise<void>;
}

export function useLions(): UseLionsReturn {
  const [members, setMembers] = useState<Lion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchLions() {
      setIsLoading(true);
      const { data, error } = await supabase.from('lions').select('*').order('id');
      if (!error && data) {
        setMembers(data.map(rowToLion));
      }
      setIsLoading(false);
    }
    fetchLions();
  }, []);

  async function addMember(formData: AddMemberData): Promise<void> {
    const seed = Math.random().toString(36).slice(2, 8);
    const insertData = {
      name: formData.name,
      part: formData.part as string,
      short_intro: formData.shortIntro,
      skills: formData.skills,
      intro: formData.intro,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      lastword: formData.lastword,
      is_me: false as boolean,
      seed,
    };
    const { data, error } = await supabase
      .from('lions')
      .insert(insertData)
      .select()
      .single();

    if (!error && data) {
      setMembers((prev) => [...prev, rowToLion(data)]);
    }
  }

  async function deleteLastMember(): Promise<void> {
    if (members.length === 0) return;
    const last = members[members.length - 1];
    if (window.confirm(`"${last.name}"을(를) 삭제하시겠습니까?`)) {
      const { error } = await supabase.from('lions').delete().eq('id', last.id);
      if (!error) {
        setMembers((prev) => prev.slice(0, -1));
      }
    }
  }

  async function fetchAndAdd(count: number): Promise<void> {
    const url = API_URL.replace('NUMBER', String(count));
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data: RandomUserApiResponse = await res.json();

    const newMembers = data.results.map((user) => convertUserToMember(user, 0));

    const inserts = newMembers.map((m) => ({
      name: m.name,
      part: m.part as string,
      short_intro: m.shortIntro,
      skills: m.skills,
      intro: m.intro,
      email: m.email,
      phone: m.phone,
      website: m.website,
      lastword: m.lastword,
      is_me: false as boolean,
      seed: m.seed,
    }));

    const { data: inserted, error } = await supabase
      .from('lions')
      .insert(inserts)
      .select();
    if (!error && inserted) {
      setMembers((prev) => [...prev, ...inserted.map(rowToLion)]);
    }
  }

  async function fetchAndRefresh(): Promise<void> {
    const myMember = members.find((m) => m.isMe);
    const currentCount = members.filter((m) => !m.isMe).length;

    const url = API_URL.replace('NUMBER', String(currentCount));
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data: RandomUserApiResponse = await res.json();

    await supabase.from('lions').delete().eq('is_me', false);

    const newMembers = data.results.map((user) => convertUserToMember(user, 0));
    const inserts = newMembers.map((m) => ({
      name: m.name,
      part: m.part as string,
      short_intro: m.shortIntro,
      skills: m.skills,
      intro: m.intro,
      email: m.email,
      phone: m.phone,
      website: m.website,
      lastword: m.lastword,
      is_me: false as boolean,
      seed: m.seed,
    }));

    const { data: inserted, error } = await supabase
      .from('lions')
      .insert(inserts)
      .select();
    if (!error && inserted) {
      setMembers(myMember ? [myMember, ...inserted.map(rowToLion)] : inserted.map(rowToLion));
    }
  }

  return { members, isLoading, addMember, deleteLastMember, fetchAndAdd, fetchAndRefresh };
}