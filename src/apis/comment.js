import axios from "../configs/axiosConfig";

export const apiAddCommentAppetizer = (data)  => axios({
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