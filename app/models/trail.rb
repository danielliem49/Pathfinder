# == Schema Information
#
# Table name: trails
#
#  id               :bigint           not null, primary key
#  trail_name       :string           not null
#  latitude         :float            not null
#  longitude        :float            not null
#  length           :float            not null
#  difficulty_level :string           not null
#  elevation_gain   :integer          not null
#  route_type       :string           not null
#  estimated_time   :string           not null
#  description      :text             not null
#  tags             :string           default(""), not null
#  park_id          :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Trail < ApplicationRecord

    validates_presence_of :trail_name, :latitude, :longitude, :length, :difficulty_level, :elevation_gain, :route_type, :estimated_time, :description, :tags
    validates_uniqueness_of :trail_name

    belongs_to :park,
        foreign_key: :park_id,
        class_name: :Park

    has_many :reviews,
        foreign_key: :trail_id,
        class_name: :Review,
        dependent: :destroy

    has_many_attached :images, dependent: :purge_later
    # has_many :tags

    def calc_avg_rating
        reviews = self.reviews
        rating_total = 
        if reviews.length > 0
            reviews.map {|review|review.rating}.sum / reviews.length * 1.0
        else
            0.0
        end
    end

    def num_reviews
        return self.reviews.length
    end
end
