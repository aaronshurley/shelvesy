module Api
  class ShelvesController < ApplicationController
    def create
      @shelf = Shelf.new(shelf_params)
      if @shelf.save
        render json: @shelf
      else
        render json: @book.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @shelves = Shelf.all
      render json: @shelves
    end

    def show
      @shelf = Shelf.find(params[:id])
      render json: @shelf
    end

    private
    def shelf_params
      params.require(:shelf).permit(:name, :user_id)
    end
  end
end