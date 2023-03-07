# # N+1 problem
# json.extract! park, :id, :park_name, :latitude, :longitude, :contact, :description, :country, :state
# json.imageUrl url_for(park.trails.first.images.first)


json.extract! park, :id, :park_name, :latitude, :longitude, :contact, :description, :country, :state

if park.trails.any?
    json.imageUrl url_for(park.trails.first.images.first)
else
    json.imageUrl nil
end
