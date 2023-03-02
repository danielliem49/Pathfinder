class Api::ParksController < ApplicationController

    def index
        @parks = Park.all
        render 'api/parks/index'
    end

    def show
        @park = Park.find_by(id: params[:id])
        # @count = Park.total_reviews(@park.id)
        render 'api/parks/show'
    end
    
end
