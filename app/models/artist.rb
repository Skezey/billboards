class Artist < ApplicationRecord
  belongs_to :genre
  has_many :songs, dependent: :destroy
  has_many :events, dependent: :destroy

  validates_presence_of :name, :rank
end
