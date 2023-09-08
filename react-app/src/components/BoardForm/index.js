import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useModal } from "../../context/Modal";
// import { createImageFileAndUrl, deleteImageFileBoard } from "../../store/image"
import { thunkCreateBoard } from "../../store/boards";
import { thunkUpdateBoard } from "../../store/boards";
import './BoardForm.css';

export default function BoardForm({ formType, board }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const boardId = board.id;
  const userId = board.userId;

  const [title, setTitle] = useState(board?.title);
  const [imageId, setImageId] = useState(board?.imageId);
  const [imageUrl, setImageUrl] = useState(board?.imageUrl);
  const [imageFile, setImageFile] = useState('');
  const [imageFileUpdated, setImageFileUpdated] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  console.log('**** in BoardForm, imageUrl:', imageUrl)

  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch]);

  const imageUrls = [
    {
      'id': 1,
      'url': 'https://images.unsplash.com/photo-1508614999368-9260051292e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    },
    {
      'id': 2,
      'url': 'https://images.unsplash.com/photo-1635776062043-223faf322554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80',
    },
    {
      'id': 3,
      'url': 'https://images.unsplash.com/photo-1508615070457-7baeba4003ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    },
    {
      'id': 4,
      'url': 'https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    },
    {
      'id': 5,
      'url': 'https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    },
    {
      'id': 6,
      'url': 'https://images.unsplash.com/photo-1621799754526-a0d52c49fad5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80',
    },
    {
      'id': 7,
      'url': 'https://images.unsplash.com/photo-1546448396-6aef80193ceb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2942&q=80',
    },
    {
      'id': 8,
      'url': 'https://images.unsplash.com/photo-1604340083878-a3947d1775c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80',
    },
    {
      'id': 9,
      'url': 'https://images.unsplash.com/photo-1528731708534-816fe59f90cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    },
    {
      'id': 10,
      'url': 'https://images.unsplash.com/photo-1595404603599-2ad07f19556d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80',
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();

    /////// 1. CREATE IMAGE + CREATE BOARD
    if (formType === 'Create Board') {
      // try { // CREATE IMAGE
      //   const resCreateImg = await dispatch(createImageFileAndUrl(imageFile));
      //   { resCreateImg.errors ? setErrors(resCreateImg.errors) : setErrors({}); }

      //   if (resCreateImg.url) {
      //     board = {
      //       ...board,
      //       title,
      //       imageUrl: resCreateImg.url,
      //       userId
      //     };
      //   }
      // } catch (resCreateImg) {
      //   return resCreateImg;
      // }


      board = {
        ...board,
        title,
        imageId: 1,
        imageUrl,
        userId
      };

      console.log('**** in Create Board, board:', board)
      console.log('**** in Create Board, imageId:', imageId)

      try { // CREATE BOARD
        const res = await dispatch(thunkCreateBoard(board)); // VScode gives note about not needing 'await', but it IS needed
        console.log('**** in Create Board TRY, res:', res)
        if (res.id) {
          setErrors({});
          history.push(`/boards/${res.id}`);
          closeModal();
        } else if (res.errors) {
          setErrors(res.errors);
        }
      } catch (res) {
        // console.log('**** in Create Board CATCH, res:', res)
        const data = await res.json();
        // console.log('**** in Create Board CATCH, data:', data)
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }

      /////// 2. UPDATE IMAGE + UPDATE BOARD
    } else if (formType === 'Update Board' && imageFileUpdated) {
      // try { // UPDATE IMAGE
      //   const resDeleteImg = await dispatch(deleteImageFileBoard(board.id));
      //   { resDeleteImg.errors ? setErrors(resDeleteImg.errors) : setErrors({}); }
      //   if (resDeleteImg.message) {
      //     const resCreateImg = await dispatch(createImageFileAndUrl(imageFile));
      //     { resCreateImg.errors ? setErrors(resCreateImg.errors) : setErrors({}); }

      //     if (resCreateImg.url) {
      //       board = {
      //         ...board,
      //         title,
      //         imageUrl: resCreateImg.url,
      //         userId
      //       };
      //     }
      //   } else if (resDeleteImg.errors) {
      //     setErrors(resDeleteImg.errors);
      //   }
      // } catch (resDeleteImg) {
      //   return resDeleteImg;
      // }

      board = {
        ...board,
        title,
        imageId,
        imageUrl,
        userId
      };

      try { // UPDATE BOARD
        const res = await dispatch(thunkUpdateBoard(board)); // VScode notes not needing 'await', but it IS needed
        if (res.id) {
          setErrors({});
          history.push(`/boards/${boardId}`);
          closeModal();
        } else {
          return res;
        }
      } catch (res) {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }

      /////// 3. UPDATE BOARD *ONLY*
    } else if (formType === 'Update Board' && !imageFileUpdated) {
      board = {
        ...board,
        title,
        imageId,
        imageUrl
      };

      try { // UPDATE BOARD
        const res = await dispatch(thunkUpdateBoard(board)); // VScode notes not needing 'await', but it IS needed
        if (res.id) {
          setErrors({});
          history.push(`/boards/${boardId}`);
          closeModal();
        } else {
          return res;
        }
      } catch (res) {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    }
  };

  return (<>{isLoaded && (
    <form onSubmit={handleSubmit}>

      <div className='create-board-form-section'>
        <div className='board-form-top-header'>
          {formType === 'Create Board' ? 'Create Board' : 'Update Board'}
        </div>
      </div>

      <div className='create-board-form-section'>
        <div id='imageButtons'>
          {imageUrls.length ?
            imageUrls.map((imageUrl) => (
              <div id='imageButtonDiv' key={imageUrl.id} onClick={() => setImageUrl(imageUrl.url)}>
                <img id='imageButtonImg' src={imageUrl.url}></img>
              </div>
            ))
            :
            (<></>)
          }
        </div>
        {errors.background && (<div className="board-error-text">{errors.background}</div>)}
      </div>

      {/* <div className='create-board-form-section'>
        <div>
          <input
            size="57"
            type="text"
            name="background"
            onChange={(e) => setBackground(e.target.value)}
            value={background}
            placeholder='Background'
            required
          />
        </div>
        {errors.background && (<div className="board-error-text">{errors.background}</div>)}
      </div> */}

      <div className='create-board-form-section'>
        <div>
          <input
            size="57"
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder='Title'
            required
          />
        </div>
        {errors.title && (<div className="board-error-text">{errors.title}</div>)}
      </div>

      {/* {formType === 'Create Board' ?
            <>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  name="imageUrl"
                  onChange={(e) => {
                    setImageFile(e.target.files[0])
                  }}
                  required
                />
              </div>
              {errors.imageUrl && (<div className="board-error-text">{errors.imageUrl}</div>)}
            </>
            :
            <>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  name="imageUrl"
                  onChange={(e) => {
                    setImageFile(e.target.files[0])
                    setImageFileUpdated(true)
                  }}
                />
              </div>
              {errors.imageUrl && (<div className="board-error-text">{errors.imageUrl}</div>)}
            </>
          } */}

      <button
        className={disabled ? "create-board-form-button-disabled" : "create-board-form-button"}
        disabled={disabled}
      >
        {formType === 'Create Board' ? 'Add' : 'Update'}
      </button>

    </form >
  )
  }</>)
};
