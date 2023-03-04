class Api::ParksController < ApplicationController
    wrap_parameters include: Park.attribute_names + [:image], format: :multipart_form

    def show
        @park = Park.find_by(id: params[:id])
        if @park
            render "/api/parks/show"
            # render :show
        else
            render json: ['Park does not exist'], status: 404
        end
    end

    def index
        @parks = Park.all
        render "/api/parks/index"
        # render :index
    end
    
end
