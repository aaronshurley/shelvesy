json.array! @books do |book|
  json.extract! book :id, :title, :author, :isbn, :created_at, :udpated_at
end