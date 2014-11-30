json.extract! @book :id, :title, :author, :isbn, :description, :img_url, :created_at, :udpated_at
json.reviews @book.reviews do |review|
  json.extract! review, :id, :title, :body, :rating, :book_id, :user_id, :created_at, :updated_at
end