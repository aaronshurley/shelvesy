class EditReviews < ActiveRecord::Migration
  def change
    change_column :reviews, :rating, :integer, null: true
  end
end
