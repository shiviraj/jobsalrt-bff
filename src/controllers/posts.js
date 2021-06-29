import express from 'express'
import {handleError} from "../utils/errorHandlers";
import PostsService from "../services/posts";
import {POSTS_CUSTOM_ERRORS} from "../errorMaps/posts.errors";

const PostsController = () => {
  const router = express.Router()

  router.post('/type/:type/posts-count', (req, res) => {
    PostsService.getPageCount(req.params.type, req.body)
      .then(response => res.send(response.data))
      .catch(error => {
        handleError(error, res, POSTS_CUSTOM_ERRORS.PAGE_NOT_FOUND)
      })
  })

  router.post('/type/:type/page/:page', (req, res) => {
    const {page = 1, type} = req.params
    PostsService.getPosts(page, type, req.body)
      .then(response => res.send(response.data))
      .catch(error => handleError(error, res, POSTS_CUSTOM_ERRORS.NOT_FOUND))
  })

  router.post('/type/:type', (req, res) => {
    PostsService.getPostsWithUrls(req.params.type, req.body)
      .then(response => res.send(response.data))
      .catch(error => {
        handleError(error, res, POSTS_CUSTOM_ERRORS.NOT_FOUND)
      })
  })

  router.get("/options", (req, res) => {
    PostsService.getOptions(req.query)
      .then(response => res.send(response.data))
      .catch(error => {
        handleError(error, res, POSTS_CUSTOM_ERRORS.PAGE_NOT_FOUND)
      })
  })

  router.get("/search-options/:search", (req, res) => {
    PostsService.getSearchOptions(req.params.search)
      .then(response => res.send(response.data))
      .catch(error => {
        handleError(error, res, POSTS_CUSTOM_ERRORS.PAGE_NOT_FOUND)
      })
  })

  return router
}

export {PostsController}
