import express from 'express'
import {POSTS_CUSTOM_ERRORS} from "../errorMaps/posts.errors";
import {handleError} from "../utils/errorHandlers";
import PostService from "../services/post";

const PostController = () => {
  const router = express.Router()

  router.get("/:url", (req, res) => {
    PostService.getPostByUrl(req.params.url)
      .then(response => res.send(response.data))
      .catch(error => {
        handleError(error, res, POSTS_CUSTOM_ERRORS.PAGE_NOT_FOUND)
      })
  })

  router.get("/:url/update-views", (req, res) => {
    PostService.updateViewsByUrl(req.params.url)
      .then(response => res.send(response.data))
      .catch(error => {
        handleError(error, res, POSTS_CUSTOM_ERRORS.PAGE_NOT_FOUND)
      })
  })

  return router
}

export {PostController}
