import ColumnForm from '../ColumnForm';

export default function ColumnFormCreate({ boardId }) {

  let column = {
    boardId,
    cardOrder: '',
    title: '',
    colorName: '',
  }

  return (
    <ColumnForm
      formType='Create Column'
      column={column}
    />
  )
};
