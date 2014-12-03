# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141203001849) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "books", force: true do |t|
    t.string   "title",                         null: false
    t.string   "author",                        null: false
    t.integer  "isbn",                          null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "description",   default: "TBD", null: false
    t.string   "img_url_small"
    t.string   "img_url_med"
    t.string   "img_url_thumb"
  end

  add_index "books", ["author"], name: "index_books_on_author", using: :btree
  add_index "books", ["isbn"], name: "index_books_on_isbn", using: :btree
  add_index "books", ["title"], name: "index_books_on_title", using: :btree

  create_table "comments", force: true do |t|
    t.text     "body",       null: false
    t.integer  "user_id",    null: false
    t.integer  "review_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["review_id"], name: "index_comments_on_review_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "reviews", force: true do |t|
    t.text     "body"
    t.integer  "rating"
    t.integer  "book_id",    null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "reviews", ["book_id"], name: "index_reviews_on_book_id", using: :btree
  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id", using: :btree

  create_table "shelved_books", force: true do |t|
    t.integer  "book_id",    null: false
    t.integer  "shelf_id",   null: false
    t.datetime "date_added", null: false
    t.datetime "date_read"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "shelved_books", ["book_id"], name: "index_shelved_books_on_book_id", using: :btree
  add_index "shelved_books", ["shelf_id"], name: "index_shelved_books_on_shelf_id", using: :btree

  create_table "shelves", force: true do |t|
    t.string   "name",       null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "shelves", ["name"], name: "index_shelves_on_name", using: :btree
  add_index "shelves", ["user_id"], name: "index_shelves_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.string   "gravatar_url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

end
