class AddThumbnailImgUrlToBooks < ActiveRecord::Migration
  def change
    add_column :books, :img_url_thumb, :string
  end
end
