module Api
  class ShelvesController < ApplicationController
    def create
      @shelf = current_user.shelves.new(shelf_params)
      if @shelf.save
        render json: @shelf
      else
        render json: @shelf.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @shelf = current_user.shelves.find(params[:id])
      @shelf.try(:destroy)
      render json: {}
    end

    def index
      @shelves = current_user.shelves
      render :index
    end

    def show
      @shelf = Shelf.includes(:user, :books).find(params[:id])
      render :show
    end

    private
    def shelf_params
      params.require(:shelf).permit(:name, :user_id)
    end
  end
end