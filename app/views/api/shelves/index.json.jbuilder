json.array! @shelves do |shelf|
  json.partial! 'shelf', shelf: shelf
end