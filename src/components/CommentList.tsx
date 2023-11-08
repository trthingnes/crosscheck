import { useState, useEffect } from 'react'
import { Post } from '../utils/Types'
import { updatePost } from '../utils/Firebase'
import Comment from './Comment'
import './componentsCss/CommentForm.css'

function CommentList(props: { quote: any; id: any; posts: Post[]; setPosts: any }) {
    const [showAmount, setShowAmount] = useState(3)
    const [upvoted, setUpvoted] = useState(
        Array(props.posts.length).fill(false),
    )
    const [downvoted, setDownvoted] = useState(
        Array(props.posts.length).fill(false),
    )

    useEffect(() => {
        const votesFromStorage = localStorage.getItem(props.id ? props.id : "")
        if (votesFromStorage){
            const votes = JSON.parse(votesFromStorage)
            const newIsUpvoted = []
            const newIsDownvoted = []
            for (let i = 0; i < props.posts.length; i++){
                newIsUpvoted[i] = votes.upvoted[i] ? true : false
                newIsDownvoted[i] = votes.downvoted[i] ? true : false
            }           
            setUpvoted(newIsUpvoted)
            setDownvoted(newIsDownvoted)
        } 

    },[props.id, props.posts.length])

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
            localStorage.setItem(props.id,JSON.stringify({upvoted: upvoted, downvoted: newDownvoted}))
        } else {
            const newUpvoted = [...upvoted]
            newUpvoted[index] = true
            setUpvoted(newUpvoted)
            localStorage.setItem(props.id,JSON.stringify({upvoted: newUpvoted, downvoted: downvoted}))
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
            localStorage.setItem(props.id,JSON.stringify({upvoted: newUpvoted, downvoted: downvoted}))
        } else {
            const newDownvoted = [...downvoted]
            newDownvoted[index] = true
            setDownvoted(newDownvoted)
            localStorage.setItem(props.id,JSON.stringify({upvoted: upvoted, downvoted: newDownvoted}))
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
