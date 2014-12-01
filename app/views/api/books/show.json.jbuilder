json.extract! @book, :id, :title, :author, :isbn, :description, :img_url_small, :img_url_med, :created_at, :updated_at
json.reviews @book.reviews do |review|
  json.extract! review, :id, :title, :body, :rating, :book_id, :user_id, :created_at, :updated_at
end
if @current_user.books.include?(@book)
  @current_user.shelves.each do |shelf|
    if shelf.books.include?(@book)
      json.on_shelf shelf, :id, :name, :user_id
    end
  end
end
json.shelves @current_user.shelves do |shelf|
  json.extract! shelf, :id, :name, :user_id
end