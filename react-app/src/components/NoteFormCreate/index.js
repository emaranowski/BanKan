import NoteForm from '../NoteForm';

export default function NoteFormCreate({ notebookId }) {

  let note = {
    notebookId,
    colorName: '',
    title: '',
    text: '',
  }

  return (
    <NoteForm
      formType='Create Note'
      note={note}
    />
  )
};
