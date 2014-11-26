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

require 'test_helper'

class ShelvedBookTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
