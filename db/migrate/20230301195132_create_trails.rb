class CreateTrails < ActiveRecord::Migration[7.0]
  def change
    create_table :trails do |t|
      t.string :trail_name, null:false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.integer :length, null: false
      t.string :difficulty_level, null: false
      t.integer :elevation_gain, null: false
      t.string :route_type, null: false
      t.string :estimated_time, null: false
      t.text :description, null: false
      t.string :tags, null: false, default: ""
      t.references :park, null: false, foreign_key: {to_table: :parks}

      t.timestamps
    end
    add_index :trails, :trail_name, unique: true
  end
end