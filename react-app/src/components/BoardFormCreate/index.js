import BoardForm from '../BoardForm';

export default function BoardFormCreate({ userId }) {

  let board = {
    title: '',
    imageId: 1,
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
