class Api::TrailsController < ApplicationController

    def show
        @trail = Trail.find_by(id: params[:id])
        if @trail
            render "/api/trails/show"
        else
            render json: ['Trail does not exist'], status: 404
        end
    end

    def index
        @trails = Trail.all
        # @trails = Trail.all.includes(:tags)
        render "/api/trails/index"
    end

    def trail_params
        params.require(:trail).permit(:trail_name, :latitude, :longitude, :length, :difficulty_level, :elevation_gain, :route_type, :estimated_time, :description, :tags, :park_id, photos: [])
    end

end
