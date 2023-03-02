class ChangeTrailsLengthType < ActiveRecord::Migration[7.0]
  def change
    change_column :trails, :length, :float
  end
end
