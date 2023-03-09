# N+1 problem
trails = @trails.includes(:park).includes(:reviews)

# trails.each do |trail|
#     json.set! trail.id do
#         json.extract! trail, :id, :trail_name, :latitude, :longitude, :length, :difficulty_level, :elevation_gain, :route_type, :estimated_time, :description, :tags, :park_id
#         json.imagePreviewUrl trail.images.attached? ? url_for(trail.images.first) : nil
#         # json.images trail.images.map { |file| url_for(file) } 
#         json.parkName trail.park.park_name

#         numReviews = []
#         trail.reviews.each do |review|
#             numReviews << review.rating
#         end

#         json.avgRating numReviews.empty? ? 0.0 : (numReviews.sum.to_f / numReviews.length).round(1)
#         json.numReviews numReviews.length
#     end
# end

@trails.each do |trail|
    json.set! trail.id do 
        json.extract! trail, :id, :trail_name, :latitude, :longitude, :length, :difficulty_level, :elevation_gain, :route_type, :estimated_time, :description, :tags, :park_id
        json.imagePreviewUrl trail.images.attached? ? url_for(trail.images.first) : nil
        json.parkName trail.park.park_name
        json.avgRating trail.calc_avg_rating
        json.numReviews trail.num_reviews
    end
end
