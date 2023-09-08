import BoardForm from '../BoardForm';

export default function BoardFormCreate({ userId }) {

  let board = {
    title: '',
    imageUrl: '',
    userId,
  }

  return (
    <BoardForm
      formType='Create Board'
      board={board}
    />
  )
};
