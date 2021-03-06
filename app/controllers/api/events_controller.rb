class Api::EventsController < ApplicationController

  def index
    render json: Event.all
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      render json: @event
    else
      render json: { errors: @event.errors }, status: :unprocessable_entity
    end
  end

  def show
    @event = Event.find(params[:id])
    if @event
      render json: @event
    else
      render json: { errors: @event.errors }, status: :unprocessable_entity
    end
  end

  def update
    @event = Event.find(params[:id])
    if @event.update(event_params)
      render json: @event
    else
      render json: { errors: @event.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Event.find(params[:id]).destroy
    render json: { message: 'event deleted'}
  end

  private

  def event_params
    params.require(:event).permit(:title, :location, :date, :link, :end_at)
  end
end
