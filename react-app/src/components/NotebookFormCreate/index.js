import NotebookForm from '../NotebookForm';

export default function NotebookFormCreate({ userId }) {

  let notebook = {
    title: '',
    imageUrl: '',
    userId,
  }

  return (
    <NotebookForm
      formType='Create Notebook'
      notebook={notebook}
    />
  )
};
