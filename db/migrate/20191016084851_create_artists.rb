class CreateArtists < ActiveRecord::Migration[6.0]
  def change
    create_table :artists do |t|
      t.string :name
      t.integer :rank
      t.string :main_img
      t.string :secondary_img
      t.string :spotify_link
      t.belongs_to :genre, null: false, foreign_key: true

      t.timestamps
    end
  end
end
