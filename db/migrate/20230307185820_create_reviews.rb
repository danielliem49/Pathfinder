class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :user, null: false, foreign_key: {to_table: :users}
      t.references :trail, null: false, foreign_key: {to_table: :trails}
      t.integer :rating, null: false
      t.text :description, null: false
      t.date :date_hiked, null: false

      t.timestamps
    end
    add_index :reviews, [:trail_id, :user_id], unique: true
  end
end
