import { useState } from 'react';
import initialLions from '../data/lions';
import { convertUserToMember } from '../utils/convertUser';

const API_URL = 'https://randomuser.me/api/?results=NUMBER&nat=us,gb,ca,au,nz';

export function useLions() {
  const [members, setMembers] = useState(initialLions);
  const [nextId, setNextId] = useState(
    Math.max(...initialLions.map((m) => m.id)) + 1
  );

  function addMember(formData) {
    const newMember = {
      id: nextId,
      ...formData,
      isMe: false,
      seed: Math.random().toString(36).slice(2, 8),
    };
    setMembers((prev) => [...prev, newMember]);
    setNextId((prev) => prev + 1);
  }

  function deleteLastMember() {
    if (members.length === 0) return;
    const last = members[members.length - 1];
    if (window.confirm(`"${last.name}"을(를) 삭제하시겠습니까?`)) {
      setMembers((prev) => prev.slice(0, -1));
    }
  }

  async function fetchAndAdd(count) {
    const url = API_URL.replace('NUMBER', String(count));
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    let currentId = nextId;
    const newMembers = data.results.map((user) => {
      const member = convertUserToMember(user, currentId);
      currentId++;
      return member;
    });

    setMembers((prev) => [...prev, ...newMembers]);
    setNextId(currentId);
  }

  async function fetchAndRefresh() {
    const myMember = members.find((m) => m.isMe);
    const currentCount = members.filter((m) => !m.isMe).length;

    const url = API_URL.replace('NUMBER', String(currentCount));
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    let currentId = 10000;
    const newMembers = data.results.map((user) => {
      const member = convertUserToMember(user, currentId);
      currentId++;
      return member;
    });

    setMembers(myMember ? [myMember, ...newMembers] : newMembers);
    setNextId(currentId);
  }

  return { members, nextId, addMember, deleteLastMember, fetchAndAdd, fetchAndRefresh };
}