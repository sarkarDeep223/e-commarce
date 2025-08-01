import { average, collection, count, getAggregateFromServer } from "firebase/firestore"
import { db } from "../../firebase"


export const getProductReviewCount = async ({productId})=>{
    const ref =collection(db,`products/${productId}/reviews`);
    const data = await getAggregateFromServer(ref,{
        totalReviews:count(),
        averageRating: average("rating")
    })

    return data.data()
}