json.extract! @shelf, :id, :name, :user_id, :created_at, :updated_at
json.user @shelf.user, :id, :email, :created_at, :updated_at
json.books @shelf.books do |book|
  json.extract! book, :id, :title, :author, :isbn, :description, :img_url, :created_at, :updated_at
end