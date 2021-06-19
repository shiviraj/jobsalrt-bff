import {Posts} from "../API/posts";

const removeEmptyArray = obj => {
  const validKeys = ["location", "qualification", "formType", "ageLimit", "vacancies"]
  return Object.keys(obj).reduce((newObj, key) => {
    if (obj[key].length && validKeys.includes(key)) newObj[key] = obj[key]
    return newObj
  }, {})
}

const states = {
  "latest-jobs": "LATEST_JOB",
  "admit-cards": "ADMIT_CARD",
  "results": "RESULT",
  "answer-keys": "ANSWER_KEY",
  "admissions": "ADMISSION",
  "syllabus": "SYLLABUS"
}

const PostsService = {

  getPosts(page, type, payload) {
    const filters = removeEmptyArray(payload.filters)
    return Posts.getPosts(page, {...payload, filters, type: states[type]});
  },

  getPageCount(type, payload) {
    const filters = removeEmptyArray(payload.filters)
    return Posts.getPageCount({...payload, filters, type: states[type]});
  },

  getOptions(payload) {
    return Posts.getOptions(payload);
  },

  getSearchOptions(payload) {
    return Posts.getSearchOptions(payload);
  }
}

export default PostsService
