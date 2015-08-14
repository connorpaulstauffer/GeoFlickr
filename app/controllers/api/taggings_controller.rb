class Api::TaggingsController < ApplicationController
  def create
    tagging = Tagging.new(tagging_params)
    if tagging.save
      render json: tag
    else
      render json: tag.errors.full_messages, status: :unproccessable_entity
    end
  end

  def destroy
    tagging = Tagging.find(params[:id])
    tagging.destroy
    render json: tagging
  end

  private
  def tagging_params
    params.require(:tagging).permit(:image_id, :tag_id)
  end
end
