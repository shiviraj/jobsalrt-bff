import {Post} from "../API/post";

const PostService = {
  getPostByUrl(url) {
    return Post.getPostByUrl(url)
  },
}

export default PostService
