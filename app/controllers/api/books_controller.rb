module Api
  class BooksController < ApplicationController
    def create
      @book = Book.new(book_params)
      if @book.save
        render json: @book
      else
        render json: @board.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @books = Book.all
      render json: @books
    end

    def show
      @book = Book.find(params[:id])
      render json: @book
    end

    private
    def book_params
      params.require(:book).permit(:title, :author, :description, :isbn, :img_url)
    end
  end
end