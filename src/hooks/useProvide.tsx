import React, { createContext, useContext, useState } from 'react';
import { instance } from '../api';

export interface Note {
  id: string;
  app_id: string;
  entity_id: string;
  values: {
    [key: string]: string;
  },
  created_at: string;
  updated_at: string;
}

export interface AppData {
  notes: Note[];
  currentNote: Note | null;
  getAllNotes: () => void;
  showNote: (id: string) => void;
  loading: boolean;
  error: boolean;
}

export const ProvideContext = createContext<AppData | undefined>(undefined);

interface Provider {
  children: React.ReactNode;
}

export function ProvideApp({ children }: Provider) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const auth = useProvide();
  return <ProvideContext.Provider value={auth}>{children}</ProvideContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(ProvideContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a ProvideApp');
  }
  return context;
};

export const useProvide = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllNotes = async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line max-len
      const response = await instance.get(`/${process.env.REACT_APP_API_ID}/dtypes/entity/${process.env.REACT_APP_ENTITY_ID}.json?rest_api_key=${process.env.REACT_APP_API_KEY}`);
      setNotes(response.data.records);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  const showNote = (id: string) => {
    const note = notes.filter((n) => n.id === id);
    setCurrentNote(note[0]);
  };

  return {
    error, loading, setError, getAllNotes, notes, currentNote, showNote,
  };
};
