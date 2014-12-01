module Api
  class ShelvedBooksController < ApplicationController
    def create
      @shelved_book = ShelvedBook.new(shelved_book_params)
      if @shelved_book.save
        render json: @shelved_book
      else
        render json: @shelved_book.errors.full_messages, status: :unprocessable_entity
      end
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