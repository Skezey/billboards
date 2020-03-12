class Api::ArtistsController < ApplicationController
  before_action :set_genre, only: [:index, :create, :show, :update, :destroy]

  def index
    render json: @genre.artists.order(:rank)
  end

  def top_artist_index
    render json: Artist.all.order(:rank)
  end

  def create
    @artist = @genre.artists.new(artist_params)
    if @artist.save
      render json: @artist
    else
      render json: { errors: @artist.errors }, status: :unprocessable_entity
    end
  end

  def show
    @artist = @genre.artists.find(params[:id])
    if @artist
      render json: @artist
    else
      render json: { errors: @artist.errors }, status: :unprocessable_entity
    end
  end

  def update
    @artist = @genre.artists.find(params[:id])
    if @artist.update(artist_params)
      render json: @artist
    else
      render json: { errors: @artist.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @genre.artists.find(params[:id]).destroy
    render json: { message: 'artist deleted'}
  end

private

  def set_genre
    @genre = Genre.find(params[:genre_id])
  end

  def artist_params
    params.require(:artist).permit(:name,
                                   :rank,
                                   :homepage,
                                   :spotify_link,
                                   :main_img,
                                   :secondary_img,
                                   :description)
  end
end
