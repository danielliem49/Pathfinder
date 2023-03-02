class CreateParks < ActiveRecord::Migration[7.0]
  def change
    create_table :parks do |t|
      t.string :park_name, null:false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.string :contact, null: false
      t.text :description, null: false
      t.string :country, null: false
      t.string :state, null: false

      t.timestamps
    end
    add_index :parks, :park_name, unique: true
  end
end
