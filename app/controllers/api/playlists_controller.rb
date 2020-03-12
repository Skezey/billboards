class Api::PlaylistsController < ApplicationController
  def index
    render json: Playlist.all
  end

  def create
    @playlist = Playlist.new(playlist_params)
    if @playlist.save
      render json: @playlist
    else
      render json: { errors: @playlist.errors }, status: :unprocessable_entity
    end
  end

  def update
    @playlist = Playlist.find(params[:id])
    if @playlist.update(playlist_params)
      render json: @playlist
    else
      render json: { errors: @playlist.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Playlist.find(params[:id]).destroy
    render json: { message: 'playlist deleted'}
  end

private
  def playlist_params
    params.require(:playlist).permit(:title, :link, :image)
  end
end
