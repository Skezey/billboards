class Api::GenrePlaylistsController < ApplicationController
  before_action :set_genre

  def index
    render json: @genre.genre_playlists.all
  end

  def create
    @genre_playlist = @genre.genre_playlists.new(genre_playlist_params)
    if @genre_playlist.save
      render json: @genre_playlist
    else
      render json: { errors: @genre_playlist.errors }, status: :unprocessable_entity
    end
  end

  def update
    @genre_playlist = @genre.genre_playlists.find(params[:id])
    if @genre_playlist.update(genre_playlist_params)
      render json: @genre_playlist
    else
      render json: { errors: @genre_playlist.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @genre.genre_playlists.find(params[:id]).destroy
    render json: { message: 'genre playlist deleted'}
  end

private
  def genre_playlist_params
    params.require(:genre_playlist).permit(:title, :image, :link)
  end

  def set_genre
    @genre = Genre.find(params[:genre_id])
  end
end
