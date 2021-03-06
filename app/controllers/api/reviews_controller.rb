module Api
  class ReviewsController < ApplicationController
    def create
      @review = current_user.reviews.new(review_params)
      if @review.save
        render json: @review
      else
        render json: @review.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @review = Review.find(params[:id])
      render :show
    end

    def index
      @reviews = Review.all
      render :index
    end

    def update
      @review = Review.find(params[:id])
      if @review.update_attributes(review_params)
        render json: @review
      else
        render json: @review.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @review = Review.find(params[:id])
      @review.destroy
      render json: @review
    end

    private
    def review_params
      params.require(:review).permit(:body, :rating, :book_id, :user_id)
    end
  end
end