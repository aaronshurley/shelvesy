class CreateShelvedBooks < ActiveRecord::Migration
  def change
    create_table :shelved_books do |t|
      t.integer :book_id, null: false
      t.integer :shelf_id, null: false
      t.datetime :date_added, null: false
      t.datetime :date_read

      t.timestamps
    end
    add_index :shelved_books, :book_id
    add_index :shelved_books, :shelf_id
  end
end
