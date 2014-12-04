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
      render :index
    end

    def show
      @book = Book.find(params[:id])
      render :show
    end

    def shelved
      @books = current_user.books
      render :index
    end

    private
    def book_params
      params.require(:book).permit(:title, :author, :description, :isbn, :img_url_small, :img_url_med, :img_url_thumb, :ave_rating)
    end
  end
end