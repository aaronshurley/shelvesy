json.extract! @comment :id, :body, :book_id, :user_id, :created_at, :udpated_at
json.user @comment.user, :id, :email, :created_at, :updated_at
json.review @comment.review :id, :title, :body, :rating, :book_id, :user_id, :created_at, :udpated_at