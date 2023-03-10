
json.park do
    json.extract! @park, :id, :park_name, :latitude, :longitude, :contact, :description, :country, :state
    json.numReviews @park.num_reviews
end

json.trails do
    @park.trails.each do |trail|
        json.set! trail.id do
        json.extract! trail, :id, :trail_name, :latitude, :longitude, :length, :difficulty_level, :elevation_gain, :route_type, :estimated_time, :description, :tags, :park_id
        json.imagePreviewUrl trail.images.attached? ? url_for(trail.images.first) : nil
        json.parkName trail.park.park_name
        json.avgRating trail.calc_avg_rating
        json.numReviews trail.num_reviews
        end
    end
end
