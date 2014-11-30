class EditBooks < ActiveRecord::Migration
  def change
    rename_column :books, :img_url, :img_url_small
    add_column :books, :img_url_med, :string
  end
end
