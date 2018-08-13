class CreateSloganIdeas < ActiveRecord::Migration[5.2]
  def change
    create_table :slogan_ideas do |t|
      t.string :first_name, :limit => 50
      t.string :last_name, :limit => 50
      t.string :email, :limit => 50
      t.text :idea, :limit => 50

      t.timestamps
    end
  end
end
