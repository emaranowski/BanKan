import NoteForm from '../NoteForm';

export default function NoteFormCreate({ notebook }) {

  let note = {
    notebookId: notebook.id,
    colorName: '',
    title: '',
    text: '',
  }

  return (
    <NoteForm
      formType='Create Note'
      notebook={notebook}
      note={note}
    />
  )
};
