import {
  ActionFunctionArgs,
  Form,
  redirect,
  useLocation,
} from 'react-router-dom'
import { Post, Comment } from '../types'
import auth from '../lib/auth'
import classes from './DeleteComment.module.css'

export const action = async (args: ActionFunctionArgs) => {
  const { postId, commentId } = args.params
  const formData = await args.request.formData()
  const path = formData.get('returnTo')?.toString()

  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + `/posts/${postId}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${auth.getJWT()}`,
      },
      method: 'DELETE',
    },
  )

  if (!response.ok) {
    const { message } = await response.json()
    return { message }
  }

  return redirect(path || '/')
}

const DeleteComment = ({ post, comment }: { post: Post; comment: Comment }) => {
  const location = useLocation()

  return (
    <Form method="delete" action={`/posts/${post._id}/comments/${comment._id}`}>
      <input
        type="hidden"
        name="returnTo"
        value={location.pathname + location.search}
      />
      <button className={classes.button} type="submit">
        Delete
      </button>
    </Form>
  )
}

export default DeleteComment
