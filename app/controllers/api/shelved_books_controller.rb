module Api
  class ShelvedBooksController < ApplicationController
    def create
      @shelved_book = current_user.books.new(shelved_book_params)
      if @shelved_book.save
        render json: @shelved_book
      else
        render json: @shelved_book.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @shelved_book = current_user.books.find(params[:id])
      @shelved_book.try(:destroy)
      render json: {}
    end

    private
    def shelved_book_params
      params.require(:shelved_book).permit(:id, :user_id, :book_id)
    end
  end
end