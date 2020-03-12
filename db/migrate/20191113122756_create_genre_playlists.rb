class CreateGenrePlaylists < ActiveRecord::Migration[6.0]
  def change
    create_table :genre_playlists do |t|
      t.string :title
      t.string :link
      t.string :image
      t.belongs_to :genre, null: false, foreign_key: true

      t.timestamps
    end
  end
end
