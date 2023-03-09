class Api::ReviewsController < ApplicationController

    before_action :require_logged_in, :set_trail
    # before_action :require_logged_in

    def create
        @review = @trail.reviews.new(review_params)
        # @review = Review.new(review_params)
        if @review.save
            render :show
        else
            render json: @review.errors.full_messages, status: :unprocessable_entity
        end
    end

    def update
        @review = Review.find_by(id: params[:id])
        if @review.update(review_params)
            render :show
        else
            render json: ['Can\'t update'], status: 401
        end
    end

    def destroy
        @review = @trail.reviews.find(params[:id])
        @review.destroy
    end

    
    private

    def review_params
        params.require(:review).permit(:user_id, :trail_id, :rating, :description, :date_hiked)
    end

    def set_trail
        @trail = Trail.find(params[:trail_id])
    end

end