class CreateShelves < ActiveRecord::Migration
  def change
    create_table :shelves do |t|
      t.string :name, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :shelves, :name
    add_index :shelves, :user_id
  end
end
