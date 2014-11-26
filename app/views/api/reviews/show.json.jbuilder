json.extract! @review :id, :title, :body, :rating, :book_id, :user_id, :created_at, :udpated_at
json.user @review.user, :id, :email, :created_at, :updated_at
json.book @review.book, :id, :title, :author, :isbn, :description, :img_url, :created_at, :udpated_at