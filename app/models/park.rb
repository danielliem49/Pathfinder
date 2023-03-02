# == Schema Information
#
# Table name: parks
#
#  id          :bigint           not null, primary key
#  park_name   :string           not null
#  latitude    :float            not null
#  longitude   :float            not null
#  contact     :string           not null
#  description :text             not null
#  country     :string           not null
#  state       :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Park < ApplicationRecord

    validates_presence_of :park_name, :latitude, :longitude, :contact, :description, :country, :state
    validates_uniqueness_of :trail_name

    has_many :trails,
        foreign_key: :park_id,
        class_name: :Trail

end
