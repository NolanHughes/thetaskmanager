class Task < ApplicationRecord
	validates_presence_of :title, :due_by, :assigned_to_id
	validate :due_by_cannot_be_in_the_past

	has_one :category
	belongs_to :user

	private
	  def due_by_cannot_be_in_the_past
	    if due_by.present? && due_by < Time.now
	      errors.add(:due_by, "can't be in the past")
	    end
	  end
end
