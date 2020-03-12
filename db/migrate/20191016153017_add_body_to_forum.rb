class AddBodyToForum < ActiveRecord::Migration[6.0]
  def change
    add_column :forums, :body, :text
  end
end
