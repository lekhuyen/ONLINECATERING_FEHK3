import axios from "../configs/axiosConfig";

export const apiAddComment = (data)  => axios({
    url: '/restaurant-service/comment',
    method: 'POST',
    data
})
export const apiDeleteCommentAppetizer = (data)  => axios({
    url: `/restaurant-service/comment/${data.userId}/${data.commentId}`,
    method: 'Delete',
})
export const apiEditCommentAppetizer = (data)  => axios({
    url: `/restaurant-service/comment/${data.userId}/${data.commentId}`,
    method: 'PUT',
    data

})

export const apiAddCommentReplyAppetizer = (data)  => axios({
    url: '/restaurant-service/commentChild',
    method: 'POST',
    data
})

export const apiDeleteCommentReplyAppetizer = (data)  => axios({
    url: `/restaurant-service/commentChild/${data.userId}/${data.commentId}`,
    method: 'Delete',
})
export const apiEditCommentReplyAppetizer = (data)  => axios({
    url: `/restaurant-service/commentChild/${data.userId}/${data.replyId}`,
    method: 'PUT',
    data
})


//dish
export const apiGetDishById = (id)  => axios({
    url: `/restaurant-service/dish/${id}`,
    method: 'GET',
})
// Dessert
export const apiGetDessertById = (id)  => axios({
    url: `/restaurant-service/dessert/${id}`,
    method: 'GET',
})

//rating
export const apiAddRatingAppetizer = (data)  => axios({
    url: '/restaurant-service/rating/rating-appetizer',
    method: 'POST',
    data
})
export const apiAddRatingDish = (data)  => axios({
    url: '/restaurant-service/rating/rating-dish',
    method: 'POST',
    data
})
export const apiAddRatingDessert = (data)  => axios({
    url: '/restaurant-service/rating/rating-dessert',
    method: 'POST',
    data
})
