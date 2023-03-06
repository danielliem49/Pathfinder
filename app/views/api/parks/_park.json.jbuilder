json.extract! park, :id, :park_name, :latitude, :longitude, :contact, :description, :country, :state, :trails, :images
# json.imageUrl park.images.attached? ? park.images.url : nil
# json.imageUrls park.images.map { |file| file.url } 