module Api
  class ShelvedBooksController < ApplicationController
    def create
      @shelved_book = ShelvedBook.new(shelved_book_params)
      if @shelved_book.save
        @book = @shelved_book.book
        render 'api/books/show'
      else
        render json: @shelved_book.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @shelved_books = ShelvedBook.all
      render json: @shelved_books
    end

    def find
      @shelved_book = ShelvedBook.where(shelved_book_params)
      render json: @shelved_book
    end

    def destroy
      @shelved_book = ShelvedBook.find(params[:id])
      @shelved_book.try(:destroy)
      render json: {}
    end

    private
    def shelved_book_params
      params.require(:shelved_book).permit(:shelf_id, :book_id, :date_added)
    end
  end
end