module Api
  class ShelvesController < ApplicationController
    def create
      @shelf = Shelf.new(shelf_params)
      if @shelf.save
        render json: @shelf
      else
        render json: @shelf.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @shelves = current_user.shelves
      render json: @shelves
    end

    def show
      @shelf = Shelf.includes(:user).find(params[:id])
      render :show
    end

    private
    def shelf_params
      params.require(:shelf).permit(:name, :user_id)
    end
  end
end