import { useState } from 'react'
import { Post } from '../utils/Types'
import { updatePost } from '../utils/Firebase'
import Comment from './Comment'
import './componentsCss/CommentForm.css'

function CommentList(props: { quote: any; posts: Post[]; setPosts: any }) {
    const [showAmount, setShowAmount] = useState(3)
    const [upvoted, setUpvoted] = useState(
        Array(props.posts.length).fill(false),
    )
    const [downvoted, setDownvoted] = useState(
        Array(props.posts.length).fill(false),
    )

    const morePost = () => {
        const len = props.posts.length
        setShowAmount(Math.min(len, showAmount + 3))
    }

    const lessHPost = () => {
        setShowAmount(Math.max(3, showAmount - 3))
    }

    const upvotePost = (post: Post, index: number, upvote: boolean) => {
        post.upvotes++
        if (downvoted[index]) {
            const newDownvoted = [...downvoted]
            newDownvoted[index] = false
            setDownvoted(newDownvoted)
        } else {
            const newUpvoted = [...upvoted]
            newUpvoted[index] = true
            setUpvoted(newUpvoted)
        }
        updatePost(post).then(() => {
            const newPosts = [...props.posts]
            newPosts[index] = post
            props.setPosts(newPosts)
        })
    }

    const downvotePost = (post: Post, index: number, upvote: boolean) => {
        post.upvotes--
        if (upvoted[index]) {
            const newUpvoted = [...upvoted]
            newUpvoted[index] = false
            setUpvoted(newUpvoted)
        } else {
            const newDownvoted = [...downvoted]
            newDownvoted[index] = true
            setDownvoted(newDownvoted)
        }
        updatePost(post).then(() => {
            const newPosts = [...props.posts]
            newPosts[index] = post
            props.setPosts(newPosts)
        })
    }

    const voteFunctions = {
        up: upvotePost,
        down: downvotePost,
        upvoted: upvoted,
        downvoted: downvoted,
    }

    return (
        <div className="commentForm">
            <div
                style={{
                    paddingLeft: '10px',
                    paddingTop: '10px',
                    width: 'auto',
                    height: '400px',
                    overflowY: 'scroll',
                }}
            >
                {props.posts
                    .map((comment: Post, index: number) => {
                        return (
                            <div key={comment.id}>
                                <Comment
                                    comment={comment}
                                    index={index}
                                    vote={voteFunctions}
                                />
                            </div>
                        )
                    })
                    .filter((o: any, k: number) => k < showAmount)}
            </div>
        </div>
    )
}

export default CommentList
