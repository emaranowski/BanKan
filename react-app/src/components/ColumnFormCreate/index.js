import ColumnForm from '../ColumnForm';

export default function ColumnFormCreate({ boardId }) {

  let column = {
    title: '',
    colorName: '',
    boardId,
  }

  return (
    <ColumnForm
      formType='Create Column'
      column={column}
    />
  )
};
