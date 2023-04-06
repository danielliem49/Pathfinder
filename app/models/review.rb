# == Schema Information
#
# Table name: reviews
#
#  id          :bigint           not null, primary key
#  user_id     :bigint           not null
#  trail_id    :bigint           not null
#  rating      :integer          not null
#  description :text             not null
#  date_hiked  :date             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Review < ApplicationRecord
    validates_presence_of :user_id, :trail_id, :rating, :description, :date_hiked
    validates :user_id, uniqueness: {scope: :trail_id, message: "You've already reviewed this trail!"}
    validates :rating, inclusion: {in: 1..5,  message: "Rating must be between 1 and 5"}
    validates :description, presence: {"Description can't be blank"}
    validates :date_hiked, presence: {"Date can't be blank"}

    belongs_to :trail,
        foreign_key: :trail_id,
        class_name: :Trail

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

end
