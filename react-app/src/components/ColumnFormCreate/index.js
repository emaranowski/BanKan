import ColumnForm from '../ColumnForm';

export default function ColumnFormCreate({ column }) {

  let column = {
    title: '',
    colorHex: '',
    boardId,
  }

  return (
    <ColumnForm
      formType='Create Column'
      column={column}
    />
  )
};
