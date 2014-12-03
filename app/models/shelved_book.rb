# == Schema Information
#
# Table name: shelved_books
#
#  id         :integer          not null, primary key
#  book_id    :integer          not null
#  shelf_id   :integer          not null
#  date_added :datetime         not null
#  date_read  :datetime
#  created_at :datetime
#  updated_at :datetime
#

class ShelvedBook < ActiveRecord::Base
  validates :book_id, :shelf_id, :date_added, presence: true
  validate :user_only_has_one_copy_of_book, on: :create
  before_validation :ensure_date_added

  belongs_to :shelf
  has_one :user, through: :shelf
  belongs_to :book

  def user_only_has_one_copy_of_book
    if user.books.where(id: self.book_id).exists?
      errors.add(:book_id, "already shelved")
    end
  end

  def ensure_date_added
    self.date_added = self.updated_at
  end
end
