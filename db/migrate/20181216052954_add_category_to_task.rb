class AddCategoryToTask < ActiveRecord::Migration[5.0]
  def change
  	add_column :tasks, :category_id, :integer
  end
end
