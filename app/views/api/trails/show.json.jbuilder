
# trail = @trail

# # add index.jbuilder modified code to make faster?

# json.extract! trail, :id, :trail_name, :latitude, :longitude, :length, :difficulty_level, :elevation_gain, :route_type, :estimated_time, :description, :tags, :park_id

# json.images trail.images.map { |file| url_for(file) } 
# json.parkName trail.park.park_name
# json.reviews trail.reviews.map do |review| 
#     json.extract! review, :id, :user_id, :trail_id, :rating, :description
#     json.date_hiked review.date_hiked.strftime('%B %d, %Y')
#     json.user do
#         json.extract! review.user, :email, :first_name, :last_name
#     end
# end

#         numReviews = []
#         trail.reviews.each do |review|
#             numReviews << review.rating
#         end

# json.avgRating numReviews.empty? ? (0.0).to_f.round(1) : (numReviews.sum.to_f / numReviews.length).round(1)
# json.numReviews numReviews.length

json.trail do 
    json.extract! @trail, :id, :trail_name, :latitude, :longitude, :length, :difficulty_level, :elevation_gain, :route_type, :estimated_time, :description, :tags, :park_id
    json.images @trail.images.map { |file| url_for(file) } 
    json.parkName @trail.park.park_name
    json.avgRating @trail.calc_avg_rating
    json.numReviews @trail.num_reviews
end

json.reviews do
    @trail.reviews.each do |review|
        json.set! review.id do
            json.extract! review, :id, :user_id, :trail_id, :rating, :description
            json.date_hiked review.date_hiked
            json.user do
                json.extract! review.user, :email, :first_name, :last_name
            end
        end
    end
end