class ChangeBooks < ActiveRecord::Migration
  def up
    add_column(:books, :description, :text, null: false, default: "TBD")
    add_column(:books, :img_url, :string)
  end

  def down
    remove_column(:books, :description)
    remove_column(:books, :img_url)
  end
end
