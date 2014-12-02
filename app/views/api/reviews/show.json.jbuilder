json.extract! @review, :id, :body, :rating, :book_id, :user_id, :created_at, :updated_at
json.user @review.user, :id, :email, :created_at, :updated_at
json.book @review.book, :id, :title, :author, :isbn, :description, :img_url_small, :img_url_med, :img_url_thumb, :created_at, :updated_at