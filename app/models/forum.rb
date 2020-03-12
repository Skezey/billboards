class Forum < ApplicationRecord
  has_many :posts, dependent: :destroy
  validates_presence_of :title, :body
end
