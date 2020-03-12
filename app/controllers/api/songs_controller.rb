class Api::SongsController < ApplicationController
  before_action :set_artist

  def index
    render json: @artist.songs.all
  end

  def create
    @song = @artist.songs.new(song_params)
    if @song.save
      render json: @song
    else
      render json: { errors: @song.errors }, status: :unprocessable_entity
    end
  end

  def update
    @song = @artist.songs.find(params[:id])
    if @song.update(song_params)
      render json: @song
    else
      render json: { errors: @song.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @artist.songs.find(params[:id]).destroy
    render json: { message: 'song deleted'}
  end

private
  def song_params
    params.require(:song).permit(:title, :year, :album)
  end

  def set_artist
    @artist = Artist.find(params[:artist_id])
  end
end
