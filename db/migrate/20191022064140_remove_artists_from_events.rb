class RemoveArtistsFromEvents < ActiveRecord::Migration[6.0]
  def change
    if foreign_key_exists?(:events, :artists)
      remove_foreign_key :events, :artists
    end
  end
end
