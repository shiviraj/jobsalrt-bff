import express from 'express'
import {handleError} from "../utils/errorHandlers";
import ContactService from "../services/contact";
import {POSTS_CUSTOM_ERRORS} from "../errorMaps/posts.errors";

const ContactController = () => {
  const router = express.Router()

  router.post('', (req, res) => {
    ContactService.save(req.body)
      .then(response => res.send(response.data))
      .catch(error => {
        handleError(error, res, POSTS_CUSTOM_ERRORS.PAGE_NOT_FOUND)
      })
  })

  return router
}

export {ContactController}
