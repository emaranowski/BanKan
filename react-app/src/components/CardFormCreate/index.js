import CardForm from '../CardForm';

export default function CardFormCreate({ columnId, boardId }) {

  let card = {
    columnId,
    title: '',
    description: '',
  }

  return (
    <CardForm
      formType='Create Card'
      card={card}
      boardId={boardId}
    />
  )
};
