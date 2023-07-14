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
  createNote: (text: string) => void;
  showEditModeForCurrentNote: (value: boolean) => void;
  editNote: (newText: string, noteId: string) => void;
  showModal: boolean;
  showDeleteModal: (value: boolean) => void;
  deleteCurrentNote: () => void;
  editMode: boolean;
  loading: boolean;
  error: string;
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
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const getAllNotes = async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line max-len
      const response = await instance.get(`/${process.env.REACT_APP_API_ID}/dtypes/entity/${process.env.REACT_APP_ENTITY_ID}.json?rest_api_key=${process.env.REACT_APP_API_KEY}`);
      setNotes(response.data.records);
      setLoading(false);
    } catch (err) {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  const createNote = async (text: string) => {
    try {
      // eslint-disable-next-line max-len
      const response = await instance.post(`/${process.env.REACT_APP_API_ID}/dtypes.json`, {
        rest_api_key: process.env.REACT_APP_API_KEY,
        values: {
          entity_id: process.env.REACT_APP_ENTITY_ID,
          [`${process.env.REACT_APP_RECORDS_ID}`]: text,
        },
      });
      setNotes((prevState) => [...prevState, response.data.record]);
      setError('');
    } catch (err) {
      setError('Something went wrong');
    }
  };

  const showNote = (id: string) => {
    const note = notes.filter((n) => n.id === id);
    setCurrentNote(note[0]);
  };

  const showEditModeForCurrentNote = (value: boolean) => {
    setEditMode(value);
  };

  const editNote = async (newText: string, noteId: string) => {
    try {
      // eslint-disable-next-line max-len
      const response = await instance.put(`/${process.env.REACT_APP_API_ID}/dtypes/${noteId}.json`, {
        rest_api_key: process.env.REACT_APP_API_KEY,
        values: {
          entity_id: process.env.REACT_APP_ENTITY_ID,
          [`${process.env.REACT_APP_RECORDS_ID}`]: newText,
        },
      });
      const editableNote = notes.find((note) => note.id === noteId);
      if (editableNote) {
        const newValues = response.data.record.values;
        setNotes((prevState) => prevState.map((note) => {
          if (note.id === noteId) {
            return { ...note, values: newValues };
          }
          return note;
        }));
        setError('');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  const showDeleteModal = (value: boolean) => {
    setShowModal(value);
  };

  const deleteCurrentNote = async () => {
    try {
      const id = currentNote?.id;
      // eslint-disable-next-line max-len
      await instance.delete(`/${process.env.REACT_APP_API_ID}/dtypes/${id}.json?rest_api_key=${process.env.REACT_APP_API_KEY}`);
      setNotes((prevState) => [...prevState.filter((note) => note.id !== id)]);
      setShowModal(false);
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return {
    error,
    loading,
    setError,
    getAllNotes,
    notes,
    currentNote,
    showNote,
    createNote,
    editMode,
    showEditModeForCurrentNote,
    editNote,
    showModal,
    showDeleteModal,
    deleteCurrentNote,
  };
};
