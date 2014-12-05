reviews = [];
reviews.push("Shakespeare was a real cool person for his time. Unfortunately, his plays are not a real cool thing to read for my time. It is English and I speak English. I just don't happen to speak Old English. Which is really ironic because I am old and speaking English. If you read slowly and put your thinking cap on, you will get the gist of what the story is about. Or! You can just purchase Cliff notes, etc. This story is exciting and full of action...........I Think?")
reviews.push("This is a tough book to read unless you understand several languages and are on LSD. I may have thirty or forty more years to live so maybe I'll get through it.")
reviews.push("This book was a complete waste of paper. It had some interesting points but, it had no plot. It also turned out to be a major dissappointment because it ended so poorly. It should have been some elaborate lie that he had thought up while telling his sister. His parents should have played a bigger role in the book. The one part I did like was him talking to his brother.")
reviews.push("This book was rather long and boring then adventerous and fun. I have read many books written by John Steinbeck such as: The Red Pony, Of Mice and Men and etc. If you want to read this book then go ahead but I would rather recommend Of Mice and Men or The Red Pony.")
reviews.push("this was one of the most boring books I have ever read. DO NOT READ THIS BOOK! It may be considered a classic of literature, but i prefer a book with a plot. I can't believe that some people actually liked this spineless piece of junk that some call a book. The book was somewhat well written, but the story lacked EVERYTHING. Who cares whether Mark Twain wrote the book or whether Aohohfe Lkahfhagauy wrote the book? IT STUNK!")
reviews.push("This book stunk. I believe that reality can have deeper meanings, but don't get to deep or you'll drown. The only time you can go that deep and not drown, is with drugs. I never thought Lord of the Flies would attract so many druggies.")
reviews.push("The master of literature, Ernest Hemingway. There is nothing masterful about this boring little story. Dinner and drinks and more drinks then more dinner. Nothing happens and nothing is going to happen in this party boy tale. The only interesting thing about this book is how the title was conceived. It seems it was taken from a passage in the bible. I am no longer convinced Hemingway was a great writer.")
reviews.push("Parts of the book were discussing political views nothing to do with Anna. It appeared their were many main characters not only Anna.")
reviews.push("Heyyyy I had to read this book for school and it was the worst thing I ever read. A worthless good for nothing piece of junk! Actually it is good for something. I took this book with me to rifle practice and i shot at this instead of the target. I got busted but hey it was worth it. Mail me if you want a picture of my shooting.")
reviews.push("Attempting to read this book is worse than watching the grass grow. At least the grass will become something you enjoy. The title and plotline of the story intrigued me to read it. Don't get me wrong, if well-written, this storyline could be very interesting. But even after just ten pages, the only thought going through my mind was 'When will this guy shut up and tell the story???' The plot comes in a distant second to the narrator's monotone, seemingly unending monologue. If I could withstand this, I believe I would have enjoyed it. But forgive me for not having that kind of patience for hundreds of pages.")
reviews.push("The book is about two guys going from field to field for jobs. George is a small man that protects Lennie. Lennie is a very big man with the mind of a child. The story takes place on a field in California. I disliked the book because to me it was stipid. George is always yelling at Lennie and telling him what to do. Then what George does to Lennie at the end is sad and mean. you would need to read the book yourself to make a decision on it.")
reviews.push("I hate it. So boring. I fell asleep at the first page. its great if youre into that old 1800s kind of speech.")
reviews.push("I  think there was way to much sexual content, and the story line was incredibly sad. Certainly not something i would recommend for anyone under the age of fifteen, If you want to get an idea of what the book is about, just search the title in the Wikipedia. But I will warn you, the review is FULL of spoilers!!!! A devoted book worm.")
reviews.push("Not so hot; phony intellectuals are told this is a great work so they make up all sorts of lies about layering and craftsmanship, when it's really just a so-so story and the ending with the guy Marlon Brandon played in the movie (Apocalypse Now) going crazy and Conrad never explaining why there should be such a fascination with him. It might be a nice book if there was a story here. But these modern phonies do not understand that writing is supposed to be enjoyable.")
reviews.push("Don't ever read this. Okay, a dog could really go from being spoiled in California to the best dog in the Yukon. Huh, believable, right? Take my advice, don't read!!!!!!!!!!!!!!!!!!!")
reviews.push("This book won the NOBEL Prize? I just can't help it, I need to write another review. This book should be placed in Solitary Confinement for 100 years. This is to save both time and trees used in printing of this book. Do not even dare buy this book even from a 2nd hand bookstore. Believe me, do not waste your money.")

# Populate with 20 Users
User.create(email: "me@gmail.com", password: "password")
User.create(email: "test@gmail.com", password: "password")
User.create(email: "username@gmail.com", password: "password")
17.times do
  User.create(email: Faker::Internet.email, password: Faker::Internet.password)
end

def search_then_create(queryString, count)
  books = GoogleBooks.search(queryString, {count: count})
  books.each do |book|
    Book.create(title: book.title,
      author: book.authors,
      isbn: book.isbn_10,
      description: book.description,
      img_url_small: book.image_link,
      img_url_med: book.image_link(:zoom => 2),
      img_url_thumb: book.image_link(:zoom => 5),
      ave_rating: book.average_rating
    )
  end
end

# Populate with ~50
search_then_create('Javascript', 7)
search_then_create('Ruby', 7)
search_then_create('Tim Ferriss', 3)
search_then_create('Ramit Sethi', 1)
search_then_create('Cooking', 5)
search_then_create('Running', 3)
search_then_create('Dogs', 3)
search_then_create('Bill Simmons', 2)
search_then_create('Malcolm Gladwell', 3)
search_then_create('Freakonomics', 3)
search_then_create('Michael Pollan', 3)
search_then_create('Science', 3)
search_then_create('Kelly Starret', 2)
search_then_create('Wisconsin', 3)
search_then_create('Green Bay Packers', 3)
search_then_create('Badgers', 3)
search_then_create('Beer', 5)
search_then_create('Fantasy Football', 3)
search_then_create('Homebrewing', 3)

# put half of the books on me's shelves
user = User.find_by_email("me@gmail.com")
Book.all.slice(0, Book.all.count / 2).each do |book|
  shelf = user.shelves.sample
  ShelvedBook.create(
    book_id: book.id,
    shelf_id: shelf.id
  )
  if shelf.name == "Read"
    Review.create(
      body: reviews.sample,
      rating: (Random.rand(5) + 1),
      book_id: book.id,
      user_id: user.id
    )
  end
end

# put half of the books on test's shelves
user1 = User.find_by_email("test@gmail.com")
Book.all.slice(0, Book.all.count / 2).each do |book|
  shelf = user1.shelves.sample
  ShelvedBook.create(
    book_id: book.id,
    shelf_id: shelf.id
  )
  if shelf.name == "Read"
    Review.create(
      body: reviews.sample,
      rating: (Random.rand(5) + 1),
      book_id: book.id,
      user_id: user1.id
    )
  end
end

# put half of the books on username's shelves
user2 = User.find_by_email("username@gmail.com")
Book.all.slice(0, Book.all.count / 2).each do |book|
  shelf = user2.shelves.sample
  ShelvedBook.create(
    book_id: book.id,
    shelf_id: shelf.id
  )
  if shelf.name == "Read"
    Review.create(
      body: reviews.sample,
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
  unless user.email == "me@gmail.com"
    shelf = user.shelves.find_by_name("Read")
    Book.all.slice(0, Book.all.count / 2).each do |book|
      ShelvedBook.create(
        book_id: book.id,
        shelf_id: shelf.id
      )
      Review.create(
        body: reviews.sample,
        rating: (Random.rand(5) + 1),
        book_id: book.id,
        user_id: user.id
      )
    end
    count += 1
  end
end