class CreatePlaylists < ActiveRecord::Migration[6.0]
  def change
    create_table :playlists do |t|
      t.string :title
      t.string :link
      t.string :image

      t.timestamps
    end
  end
end
