# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Populate with 20 Users
User.create(email: "username@gmail.com", password: "password")
User.create(email: "test@gmail.com", password: "password")
18.times do
  User.create(email: Faker::Internet.email, password: Faker::Internet.password)
end

# Populate with ~13 Books
# 3 books
ferriss_books = GoogleBooks.search('Tim Ferriss', {count: 3})
ferriss_books.each do |book|
  Book.create(title: book.title,
    author: book.authors,
    isbn: book.isbn_10,
    description: book.description,
    img_url_small: book.image_link,
    img_url_med: book.image_link(:zoom => 2),
    img_url_thumb: book.image_link(:zoom => 5)
  )
end

# 10 books
palahniuk_books = GoogleBooks.search('Chuck Palahniuk', {count: 10})
palahniuk_books.each do |book|
  Book.create(title: book.title,
    author: book.authors,
    isbn: book.isbn_10,
    description: book.description,
    img_url_small: book.image_link,
    img_url_med: book.image_link(:zoom => 2),
    img_url_thumb: book.image_link(:zoom => 5)
  )
end

# put half of the books on test's shelves
user = User.find_by_email("test@gmail.com")
Book.all.slice(0, Book.all.count / 2).each do |book|
  shelf = user.shelves.sample
  ShelvedBook.create(
    book_id: book.id,
    shelf_id: shelf.id
  )
  if shelf.name == "Read"
    Review.create(
      body: Faker::Lorem.sentences(12).join(" "),
      rating: (Random.rand(5) + 1),
      book_id: book.id,
      user_id: user.id
    )
  end
end

user2 = User.find_by_email("username@gmail.com")
Book.all.slice(0, Book.all.count / 2).each do |book|
  shelf = user2.shelves.sample
  ShelvedBook.create(
    book_id: book.id,
    shelf_id: shelf.id
  )
  if shelf.name == "Read"
    Review.create(
      body: Faker::Lorem.sentences(12).join(" "),
      rating: (Random.rand(5) + 1),
      book_id: book.id,
      user_id: user2.id
    )
  end
end

# select 5 users to review half of the books
count = 0
while count < 5 do
  user = User.all.sample
  unless user.email == "test@gmail.com"
    shelf = user.shelves.find_by_name("Read")
    Book.all.slice(0, Book.all.count / 2).each do |book|
      ShelvedBook.create(
        book_id: book.id,
        shelf_id: shelf.id
      )
      Review.create(
        body: Faker::Lorem.sentences(12).join(" "),
        rating: (Random.rand(5) + 1),
        book_id: book.id,
        user_id: user.id
      )
    end
    count += 1
  end
end