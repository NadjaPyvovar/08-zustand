import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.Authorization = `Bearer ${TOKEN}`;

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string; 
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = "", tag } = params;

  const response = await axios.get<FetchNotesResponse>("", {
    params: {
      page,
      perPage,
      ...(search.trim() !== "" && { search: search.trim() }),
      ...(tag && {tag}),
    },
  });

  return response.data;
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const response = await axios.post<Note>("", payload);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const response = await axios.get<Note>(`/${noteId}`);
  return response.data;
};


// note re.  ...(tag && {tag}) => the conditional spread is used because the backend docs say passing no tag returns all notes, and it does not recognized a literal "all" tag => when the filter is "All notes", tag must be absent from the request (not "all"); ...(tag && {tag}) only adds the tag key to the params object if tag is "true"