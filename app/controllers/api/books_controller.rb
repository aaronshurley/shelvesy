module Api
  class BooksController < ApplicationController
    def create
      @book = Book.new(book_params)
      if @book.save
        render json: @book
      else
        render json: @book.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @books = Book.all
      render json: @books
    end

    def show
      @book = Book.find(params[:id])
      @user = current_user
      render :show
    end

    def shelved
      @books = current_user.books
      render json: @books
    end

    private
    def book_params
      params.require(:book).permit(:title, :author, :description, :isbn, :img_url)
    end
  end
end