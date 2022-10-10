const { body } = require('express-validator/check')

exports.validate = (method) => {
  switch (method) {
    case 'getNewsDetail': {
        return [ 
           body('id', "id doesn't exists").exists().isInt(),
           ]   
    }
    case 'getAllNews': {
        return [ 
           body('limit', "invalid limit type").optional().isInt(),
           body('offset', "invalid offset type").optional().isInt(),
           ]   
    }
    case 'addNews': {
        return [ 
            body('article', "invalid article type").optional().isString(),
            body('title', "invalid title type").optional().isString(),
            body('subtitle', "invalid subtitle type").optional().isString(),
            body('author_name', "invalid author type").optional().isString(),
            body('image', "invalid image type").optional().isString(),
            body('publish_date', "invalid date type").optional().isString(),
            ]   
    }
    case 'deleteNews': {
        return [ 
           body('id', "id doesn't exists").exists().isInt(),
           ]   
   }
    case 'updateNews': {
     return [ 
        body('id', "id is required").exists().isInt(),
        body('article', "invalid article type").optional().isString(),
        body('title', "invalid title type").optional().isString(),
        body('subtitle', "invalid subtitle type").optional().isString(),
        body('author_name', "invalid author type").optional().isString(),
        body('image', "invalid image type").optional().isURL(),
        body('read_status', "invalid read_status type").optional().isIn(['read', 'unread']),
        ]   
    }
  }
}