module Api
  class CommentsController < ApplicationController
    def create
      @comment = Comment.new(comment_params)
      if @comment.save
        render json: @comment
      else
        render json: @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @comment = Comment.includes(:user, :review).find(params[:id])
      render :show
    end

    def destroy
      @comment = Comment.find(params[:id])
      @comment.destroy
      render json: @comment
    end

    private
    def comment_params
      params.require(:comment).permit(:body, :user_id, :review_id)
    end
  end
end