class Api::ReviewsController < ApplicationController

    before_action :require_logged_in, :set_trail

    def create
        @review = @trail.reviews.new(review_params)
        if @review.save
            render json: @review
        else
            render json: @review.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        @review = @trail.reviews.find(params[:id])
        @review.destroy
        render json: @review
    end

    
    private

    def review_params
        params.require(:review).permit(:user_id, :trail_id, :rating, :description, :date_hiked)
    end

    def set_trail
        @trail = Trail.find(params[:trail_id])
    end

end