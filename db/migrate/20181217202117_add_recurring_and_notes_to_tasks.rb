class AddRecurringAndNotesToTasks < ActiveRecord::Migration[5.0]
  def change
  	add_column :tasks, :recurring, :boolean
  	add_column :tasks, :notes, :text
  end
end
