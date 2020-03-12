class Post < ApplicationRecord
  belongs_to :user
  belongs_to :forum
  validates_presence_of :body
end
