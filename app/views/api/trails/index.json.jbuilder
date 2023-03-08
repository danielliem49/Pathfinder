# N+1 problem
trails = @trails.includes(:park).includes(:reviews)

trails.each do |trail|
    json.set! trail.id do
        json.extract! trail, :id, :trail_name, :latitude, :longitude, :length, :difficulty_level, :elevation_gain, :route_type, :estimated_time, :description, :tags, :park_id
        json.imagePreviewUrl trail.images.attached? ? url_for(trail.images.first) : nil
        # json.images trail.images.map { |file| url_for(file) } 
        json.parkName trail.park.park_name
        # json.avgRating
    end
end


