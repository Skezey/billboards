class Api::GenresController < ApplicationController
  def index
    render json: Genre.all
  end

  def create
    @genre = Genre.new(genre_params)
    if @genre.save
      render json: @genre
    else
      render json: { errors: @genre.errors }, status: :unprocessable_entity
    end
  end

  def update
    @genre = Genre.find(params[:id])
    if @genre.update(genre_params)
      render json: @genre
    else
      render json: { errors: @genre.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Genre.find(params[:id]).destroy
    render json: { message: 'genre deleted'}
  end

private
  def genre_params
    params.require(:genre).permit(:title)
  end
end
