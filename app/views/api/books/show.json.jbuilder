json.extract! @book, :id, :title, :author, :isbn, :description, :img_url_small, :img_url_med, :img_url_thumb, :created_at, :updated_at
json.reviews @book.reviews do |review|
  json.extract! review, :id, :body, :rating, :book_id, :user_id, :created_at, :updated_at
  json.user review.user, :id, :email
  json.book review.book, :id, :title, :author, :isbn, :description, :img_url_small, :img_url_med, :img_url_thumb
end
if current_user.books.include?(@book)
  current_user.shelves.each do |shelf|
    if shelf.books.include?(@book)
      json.on_shelf shelf, :id, :name, :user_id
    end
  end
end
json.current_user current_user, :id, :email
json.shelves current_user.shelves do |shelf|
  json.extract! shelf, :id, :name, :user_id
end