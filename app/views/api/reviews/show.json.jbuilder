json.extract! @review, :id, :user_id, :trail_id, :rating, :description, :date_hiked
json.user @review.user, :id, :first_name, :last_name