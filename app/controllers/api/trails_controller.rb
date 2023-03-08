class Api::TrailsController < ApplicationController
    wrap_parameters include: Trail.attribute_names + [:image], format: :multipart_form

    def show
        @trail = Trail.find_by(id: params[:id])
        if @trail
            render "/api/trails/show"
            # render :show
        else
            render json: ['Trail does not exist'], status: 404
        end
    end

    def index
        @trails = Trail.all
        
        render "/api/trails/index"
        # render :index
    end

    def trail_params
        params.require(:trail).permit(:trail_name, :latitude, :longitude, :length, :difficulty_level, :elevation_gain, :route_type, :estimated_time, :description, :tags, :park_id, images: [])
    end

end
