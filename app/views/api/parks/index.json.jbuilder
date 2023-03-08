# N+1 problem
parks = @parks.includes(:trails)

parks.each do |park|
    json.set! park.id do
        json.extract! park, :id, :park_name, :latitude, :longitude, :contact, :description, :country, :state
        json.trails park.trails

        if park.trails.any?
            json.imageUrl url_for(park.images.first)
        else
            json.imageUrl nil
        end
    end
end
