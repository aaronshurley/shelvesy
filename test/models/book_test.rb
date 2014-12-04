# == Schema Information
#
# Table name: books
#
#  id            :integer          not null, primary key
#  title         :string(255)      not null
#  author        :string(255)      not null
#  isbn          :integer          not null
#  created_at    :datetime
#  updated_at    :datetime
#  description   :text             default("TBD"), not null
#  img_url_small :string(255)
#  img_url_med   :string(255)
#  img_url_thumb :string(255)
#  ave_rating    :float
#

require 'test_helper'

class BookTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
