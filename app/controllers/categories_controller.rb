class CategoriesController < ApplicationController
	def index
		@categories = Category.all

		render json: @categories
	end

	def create
		@category = Category.new(category_params)

    if @category.save
      render json: @category
    else
      render json: @category.errors, status: :unprocessable_entity
    end
	end

	private
    def categroy_params
      params.require(:categroy).permit(:name)
    end
end
