json.array! @books do |book|
  json.extract! book :id, :title, :author, :isbn, :description, :img_url_small, :img_url_med, :img_url_thumb, :created_at, :udpated_at
end