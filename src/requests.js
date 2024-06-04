import axios from 'axios';
const baseURL = 'http://localhost:3001/notes';

export const getNotes = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

export const createNote = async (newNote) => {
  const request = await axios.post(baseURL, newNote);
  return request.data;
};

export const updateNote = async (updatedNote) => {
  const request = await axios.put(`${baseURL}/${updatedNote.id}`, updatedNote);
  return request.data;
};
