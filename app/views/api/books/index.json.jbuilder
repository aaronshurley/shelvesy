json.array! @books do |book|
  json.extract! book :id, :title, :author, :isbn, :description, :img_url :created_at, :udpated_at
end