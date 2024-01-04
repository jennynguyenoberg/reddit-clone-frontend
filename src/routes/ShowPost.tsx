import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { Post } from '../types'
import classes from './ShowPost.module.css'
import styles from '../components/DeleteComment.module.css'
import CommentForm from '../components/CommentForm'
import DeleteComment from '../components/DeleteComment'
import VoteComponent from '../components/Vote'
import DeletePost from '../components/DeletePost'

export const loader = async (args: LoaderFunctionArgs) => {
  const { params } = args

  const { id } = params

  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + '/posts/' + id,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  return response.json()
}

const ShowPost = () => {
  const post = useLoaderData() as Post

  // const commentFetcher = useFetcher({key: "comment-form-" + post._id})

  return (
    <>
      <div className={classes.post}>
        <VoteComponent post={post} />
        <div className={classes.postInfo}>
          {post.link ? (
            <Link to={post.link}>
              <h2>
                {post.title}
                <span className={classes.postUrl}>({post.link})</span>
              </h2>
            </Link>
          ) : (
            <h2>{post.title}</h2>
          )}
          <p>by {post.author.userName}</p>
          {post.body && (
            <div className={classes.postBody}>
              <p>{post.body}</p>
            </div>
          )}
          {post.image && (
            <img
              className={classes.postImage}
              src={`${import.meta.env.VITE_BACKEND_URL}/files/${post.image.id}`}
            />
          )}
          <div className={classes.buttons}>
            <DeletePost post={post} />
            <Link to={`/posts/${post._id}/update-post`}>
              <button className={styles.button}>Update</button>
            </Link>
          </div>
        </div>
      </div>
      <CommentForm postId={post._id} />
      {post.comments?.map((comment) => (
        <>
          <p key={comment._id}>
            {comment.body} - {comment.author.userName}
          </p>{' '}
          <DeleteComment post={post} comment={comment} />{' '}
        </>
      ))}{' '}
    </>
  )
}

export default ShowPost
