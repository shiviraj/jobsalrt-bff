import {Post} from "../API/post";

const PostService = {
  getPostByUrl(url) {
    return Post.getPostByUrl(url)
  },
  updateViewsByUrl(url) {
    return Post.updateViewsByUrl(url)
  }
}

export default PostService
