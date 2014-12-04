class AddAverageReviewToBooks < ActiveRecord::Migration
  def change
    add_column :books, :ave_rating, :float
  end
end
