import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useModal } from "../../context/Modal";
// import { createImageFileAndUrl, deleteImageFileBoard } from "../../store/image"
// import { createBoardThunk } from "../../store/boards";
// import { updateBoardThunk } from "../../store/boards";
import './BoardForm.css';

export default function BoardForm({ formType, board }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const boardId = board.id;
  const userId = board.userId;

  const [title, setTitle] = useState(board?.title);
  const [background, setBackground] = useState(board?.background);
  const [imageFile, setImageFile] = useState('');
  const [imageUrl, setImageUrl] = useState(board?.imageUrl);
  const [imageFileUpdated, setImageFileUpdated] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch]);

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
        imageUrl,
        userId
      };

      try { // CREATE BOARD
        const res = await dispatch(createBoardThunk(board)); // VScode gives note about not needing 'await', but it IS needed
        if (res.id) {
          setErrors({});
          history.push(`/boards/${boardId}`);
          closeModal();
        } else if (res.errors) {
          setErrors(res.errors);
        }
      } catch (res) {
        const data = await res.json();
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
        imageUrl,
        userId
      };

      try { // UPDATE BOARD
        const res = await dispatch(updateBoardThunk(board)); // VScode notes not needing 'await', but it IS needed
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
        imageUrl
      };

      try { // UPDATE BOARD
        const res = await dispatch(updateBoardThunk(board)); // VScode notes not needing 'await', but it IS needed
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

  return (
    <>
      {isLoaded && (
        <form onSubmit={handleSubmit}>

          <div className='create-board-form-section'>
            <div className='board-form-top-header'>
              {formType === 'Create Board' ? 'Create Board' : 'Update Board'}
            </div>
          </div>

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

        </form>
      )}
    </>
  )
};
