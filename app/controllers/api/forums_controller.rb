class Api::ForumsController < ApplicationController
  def index
    render json: Forum.all
  end

  def create
    @forum = Forum.new(forum_params)
    if @forum.save
      render json: @forum
    else
      render json: { errors: @forum.errors }, status: :unprocessable_entity
    end
  end

  def update
    @forum = Forum.find(params[:id])
    if @forum.update(forum_params)
      render json: @forum
    else
      render json: { errors: @forum.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Forum.find(params[:id]).destroy
    render json: { message: 'forum deleted'}
  end

private
  def forum_params
    params.require(:forum).permit(:title, :body)
  end
end
