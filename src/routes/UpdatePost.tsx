import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
} from 'react-router-dom'
import { ActionData } from '../types'
import auth from '../lib/auth'
import classes from './CreatePost.module.css'
import styles from '../components/DeleteComment.module.css'

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const id = params.id

  const postData = Object.fromEntries(formData.entries())

  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + '/posts/' + id + '/update-post',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.getJWT()}`,
      },
      body: JSON.stringify(postData),
    },
  )

  if (!response.ok) {
    const { message } = await response.json()

    return { message }
  }

  return redirect('/posts/' + id)
}

const UpdatePost = () => {
  const error = useActionData() as ActionData
  return (
    <div className={classes.createPostForm}>
      <h2>Update post</h2>

      <Form method="PUT">
        {error && (
          <p>
            <b>Error:</b> {error.message}
          </p>
        )}

        <div className={classes.formGroup}>
          <label htmlFor="Title">Title</label>
          <input type="text" name="title" id="title" required />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="link">Link (Optional)</label>
          <input type="text" name="link" id="link" />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="body">Body (Optional)</label>
          <textarea name="body" id="body" />
        </div>

        <div>
          <button className={styles.button} type="submit">
            Update post
          </button>
        </div>
      </Form>
    </div>
  )
}

export default UpdatePost
