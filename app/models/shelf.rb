# == Schema Information
#
# Table name: shelves
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Shelf < ActiveRecord::Base
  validates :name, :user_id, presence: true
  validates_uniqueness_of :name, scope: :user_id

  belongs_to :user
end
