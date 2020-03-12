class Event < ApplicationRecord
  belongs_to :artist, optional: true
  validates_presence_of :location, :date, :end_at
end
