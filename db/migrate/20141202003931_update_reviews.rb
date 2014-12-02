class UpdateReviews < ActiveRecord::Migration
  def change
    remove_column :reviews, :title
    change_column :reviews, :body, :text, null: true
  end
end
