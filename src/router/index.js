import express from 'express'
import {PostsController} from '../controllers/posts'
import {PostController} from '../controllers/post'

const router = express.Router()

router.use("/posts", PostsController())
router.use("/post", PostController())

export const getRouter = () => router
