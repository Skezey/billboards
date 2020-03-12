class AddAlbumToSongs < ActiveRecord::Migration[6.0]
  def change
    add_column :songs, :album, :string
  end
end
