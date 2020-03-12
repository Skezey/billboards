class Api::PostsController < ApplicationController
  before_action :set_forum
  before_action :set_user, only: [:create, :update]

  def index
    render json: @forum.posts
  end

  def create
    @post = @forum.posts.new(post_params)
    if @post.save
      render json: @post
    else
      render json: { errors: @post.errors }, status: :unprocessable_entity
    end
  end

  def update
    @post = @forum.posts.find(params[:id])
    if @post.update(post_params)
      render json: @post
    else
      render json: { errors: @post.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @forum.posts.find(params[:id]).destroy
    render json: { message: 'post deleted'}
  end

private
  def post_params
    params.require(:post).permit(:body, :user_id, :forum_id)
  end

  def set_forum
    @forum = Forum.find(params[:forum_id])
  end

  def set_user
    @user = User.find(params[:user_id])
  end
end
