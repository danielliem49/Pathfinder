json.extract! park, :id, :park_name, :latitude, :longitude, :contact, :description, :country, :state
json.trails park.trails

if park.trails.any?
    json.imageUrl url_for(park.images.first)
else
    json.imageUrl nil
end