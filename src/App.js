import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotes, createNote, updateNote } from './requests';

const App = () => {
  const queryClient = useQueryClient();

  const newNoteMutation = useMutation({
    mutationFn: createNote,
    // onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData(['notes']);
      queryClient.setQueryData(['notes'], [...notes, newNote]);
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    //onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
    onSuccess: (updatedNote) => {
      const notes = queryClient.getQueryData(['notes']);
      const updatedNotes = notes.map((note) =>
        note.id !== updatedNote.id ? note : updatedNote
      );
      queryClient.setQueryData(['notes'], updatedNotes);
    },
  });

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    newNoteMutation.mutate({ content, important: true });
  };

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important });
  };

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  const notes = result.data;

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      ))}
    </div>
  );
};

export default App;