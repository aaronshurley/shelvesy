json.extract! shelf, :id, :name, :user_id, :created_at, :updated_at
json.user shelf.user, :id, :email, :created_at, :updated_at
json.books shelf.books do |book|
  json.partial! 'api/books/book', book: book
end