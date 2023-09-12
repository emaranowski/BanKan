import CardForm from '../CardForm';

export default function CardFormCreate({ column, columnId, boardId }) {

  let card = {
    columnId,
    title: '',
    description: '',
    index: '',
  }

  return (
    <CardForm
      formType='Create Card'
      card={card}
      column={column}
      boardId={boardId}
    />
  )
};
