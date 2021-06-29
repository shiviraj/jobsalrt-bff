import express from 'express'
import {PostsController} from '../controllers/posts'
import {PostController} from '../controllers/post'
import {ContactController} from '../controllers/contact'

const router = express.Router()

router.use("/posts", PostsController())
router.use("/post", PostController())
router.use("/contact", ContactController())

export const getRouter = () => router
