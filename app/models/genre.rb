class Genre < ApplicationRecord
  has_many :artists, dependent: :destroy
  has_many :genre_playlists, dependent: :destroy
  validates_presence_of :title
end
