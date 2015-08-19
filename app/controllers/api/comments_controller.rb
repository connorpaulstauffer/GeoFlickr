class Api::CommentsController < ApplicationController
  def create
    @comment = current_user.comments.new(comment_params)
    if @comment.save
      render "show"
    else
      render json: @comment.errors.full_messages, status: :unproccessable_entity
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy
    render json: comment
  end

  private
  def comment_params
    params.require(:comment).permit(:image_id, :content)
  end
end
