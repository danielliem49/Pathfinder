@parks.each do |park|
    json.set! park.id do
        json.partial! 'park', park: park
    end
end
