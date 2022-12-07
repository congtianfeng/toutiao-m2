import request from '@/utils/request'
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })

}
// 获取频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
// 获取新闻列表
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
// 获取所有频道
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
// 获取联想建议
export const getSuggest = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion?q=' + q
  })
}
// 获取搜索结果
export const getResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
// 获取文章详情
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}
// 获取用户
export const followUser = targetId => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: { target: targetId }
  })
}
// 取消获取用户
export const delFollowUser = targetId => {
  return request({
    method: 'DELETE',
    url: '/v1_0/user/followings/' + targetId,
  })
}
// 文章收藏
export const collectArticle = targetId => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: { target: targetId }
  })
}
// 取消文章收藏
export const delCollectArticle = targetId => {
  return request({
    method: 'DELETE',
    url: '/v1_0/article/collections/' + targetId,
  })
}
/**
 * 点赞
 */
export const addLike = articleId => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

/**
 * 取消点赞
 */
export const deleteLike = articleId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${articleId}`
  })
}
// 获取文章评论或评论回复
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}
/**
 * 对评论或评论回复点赞
 */
export const addCommentLike = Id => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target: Id
    }
  })
}

/**
 * 取消对评论或评论回复点赞
 */
export const deleteCommentLike = Id => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${Id}`
  })
}
/**
 * 对文章或者评论进行评论
 */
export const articleReply = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
/**
 * 获取用户个人资料
 */
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile',
  })
}
/**
 * 更新用户头像
 */
export function updateUserPhoto(data) {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}