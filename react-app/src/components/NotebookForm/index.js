import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useModal } from "../../context/Modal";
// import { createImageFileAndUrl, deleteImageFileNotebook } from "../../store/image"
import { thunkCreateNotebook, thunkGetAllNotebooks, thunkGetOneNotebook } from "../../store/notebooks";
import { thunkUpdateNotebook } from "../../store/notebooks";
import './NotebookForm.css';

export default function NotebookForm({ formType, notebook }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const notebookId = notebook.id;
  const userId = notebook.userId;

  const [title, setTitle] = useState(notebook?.title);
  const [imageUrl, setImageUrl] = useState(notebook?.imageUrl);
  // const [imageFile, setImageFile] = useState('');
  const [imageFileUpdated, setImageFileUpdated] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

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
      'url': 'https://images.unsplash.com/photo-1646038572811-c951135b947c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    },
    {
      'id': 8,
      'url': 'https://images.unsplash.com/photo-1604340083878-a3947d1775c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80',
    },
    {
      'id': 9,
      'url': 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    },
    {
      'id': 10,
      'url': 'https://images.unsplash.com/photo-1604339454148-1c23f0b5d156?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2160&q=80',
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      setImageError(true);
      return;
    }

    /////// 1. CREATE IMAGE + CREATE NOTEBOOK
    if (formType === 'Create Notebook') {
      // try { // CREATE IMAGE
      //   const resCreateImg = await dispatch(createImageFileAndUrl(imageFile));
      //   { resCreateImg.errors ? setErrors(resCreateImg.errors) : setErrors({}); }

      //   if (resCreateImg.url) {
      //     notebook = {
      //       ...notebook,
      //       title,
      //       imageUrl: resCreateImg.url,
      //       userId
      //     };
      //   }
      // } catch (resCreateImg) {
      //   return resCreateImg;
      // }


      notebook = {
        ...notebook,
        title,
        imageUrl,
        userId
      };

      // console.log('**** in Create Notebook, notebook:', notebook)

      try { // CREATE NOTEBOOK
        const res = await dispatch(thunkCreateNotebook(notebook)); // VScode gives note about not needing 'await', but it IS needed
        // console.log('**** in Create Notebook TRY, res:', res)
        if (res.id) {
          setErrors({});
          // dispatch(thunkGetAllNotebooks(userId));
          // dispatch(thunkGetOneNotebook(res.id));
          history.push(`/notebooks/${res.id}`);
          closeModal();
        } else if (res.errors) {
          setErrors(res.errors);
        }
      } catch (res) {
        // console.log('**** in Create Notebook CATCH, res:', res)
        const data = await res.json();
        // console.log('**** in Create Notebook CATCH, data:', data)
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }

      /////// 2. UPDATE IMAGE + UPDATE NOTEBOOK
    } else if (formType === 'Update Notebook' && imageFileUpdated) {
      // try { // UPDATE IMAGE
      //   const resDeleteImg = await dispatch(deleteImageFileNotebook(notebook.id));
      //   { resDeleteImg.errors ? setErrors(resDeleteImg.errors) : setErrors({}); }
      //   if (resDeleteImg.message) {
      //     const resCreateImg = await dispatch(createImageFileAndUrl(imageFile));
      //     { resCreateImg.errors ? setErrors(resCreateImg.errors) : setErrors({}); }

      //     if (resCreateImg.url) {
      //       notebook = {
      //         ...notebook,
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

      notebook = {
        ...notebook,
        title,
        imageUrl,
        userId
      };

      try { // UPDATE NOTEBOOK
        const res = await dispatch(thunkUpdateNotebook(notebook)); // VScode notes not needing 'await', but it IS needed
        if (res.id) {
          setErrors({});
          history.push(`/notebooks/${notebookId}`);
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

      /////// 3. UPDATE NOTEBOOK *ONLY*
    } else if (formType === 'Update Notebook' && !imageFileUpdated) {
      notebook = {
        ...notebook,
        title,
        imageUrl
      };

      // console.log('**** !!!! in Update Notebook, notebook:', notebook)

      try { // UPDATE NOTEBOOK
        const res = await dispatch(thunkUpdateNotebook(notebook)); // VScode notes not needing 'await', but it IS needed
        if (res.id) {
          setErrors({});
          history.push(`/notebooks/${notebookId}`);
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

      <div className='notebook-form-top-header'>
        {formType === 'Create Notebook' ? 'Create Notebook' : 'Update Notebook'}
      </div>

      <div>
        <div id='image-btns'>
          {imageUrls.length ?
            imageUrls.map((imgUrl) => (
              <img
                id='image-btn-div'
                key={imgUrl.id}
                src={imgUrl.url}
                alt='Notebook background option'
                onClick={() => {
                  setImageUrl(imgUrl.url)
                  setImageSelected(true)
                }}
                className={imageUrl === imgUrl.url ? 'selected' : ''}
              >
              </img>
            ))
            :
            (<></>)
          }
        </div>
        {imageError && !imageUrl ? ('Please select an image') : null}
        {errors.missingImage && (<div className="notebook-error-text">{errors.missingImage}</div>)}
      </div>

      {/* <div>
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
        {errors.background && (<div className="notebook-error-text">{errors.background}</div>)}
      </div> */}

      <div>
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
        {errors.title && (<div className="notebook-error-text">{errors.title}</div>)}
      </div>

      {/* {formType === 'Create Notebook' ?
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
              {errors.imageUrl && (<div className="notebook-error-text">{errors.imageUrl}</div>)}
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
              {errors.imageUrl && (<div className="notebook-error-text">{errors.imageUrl}</div>)}
            </>
          } */}

      <button
        className={disabled ? "notebook-form-btn-disabled" : "notebook-form-btn"}
        disabled={disabled}
      >
        {formType === 'Create Notebook' ? 'Add' : 'Update'}
      </button>

    </form >
  )
  }</>)
};
