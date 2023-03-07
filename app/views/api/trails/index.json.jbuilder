# N+1 problem
trails = @trails.includes(:park)

trails.each do |trail|
    json.set! trail.id do
        json.partial! 'trail', trail: trail
    end
end

# @trails = Trail.includes(:park, :images)

# @trails.each do |trail|
#     json.set! trail.id do
#         json.partial! 'trail', trail: trail
#         json.park do
#             json.extract! trail.park, :id, :park_name, :latitude, :longitude, :contact, :description, :country, :state
#         end
#     end
# end
