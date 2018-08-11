class CreateRiders < ActiveRecord::Migration[5.2]
  def change
    create_table :riders do |t|
      t.string :first_name, :limit => 50
      t.string :last_name, :limit => 50
      t.string :city, :limit => 50
      t.string :state, :limit => 2
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
