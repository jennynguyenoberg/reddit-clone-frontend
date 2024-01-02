import { Link } from "react-router-dom"
import { Post } from "../types"
import classes from './PostListItem.module.css'

const PostListItem = ({ post }: { post: Post }) => {
  return (
    <div className={classes.post}>
      <div className={classes.postInfo}>
        { post.link ? (
          <Link to={post.link}>
            <h2>{post.title}<span className={classes.postUrl}>({post.link})</span></h2>
          </Link>
        ) : (
            <h2>{post.title}</h2>
        )}
        <p>by {post.author.userName}</p>
      </div>
    </div>
  )
}

export default PostListItem