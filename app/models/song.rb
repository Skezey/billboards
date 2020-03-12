class Song < ApplicationRecord
  belongs_to :artist
  validates_presence_of :title, :album, :year
end
