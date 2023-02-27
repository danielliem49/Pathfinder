class Api::SessionsController < ApplicationController

  before_action :require_logged_out, only:[:create]
  before_action :require_logged_in, only:[:destroy]

  def show
    if current_user 
      @user = current_user
      render 'api/users/show'
    else
      render json: {user: nil}
    end
  end

  def create
        # @user = User.find_by_credentials(username: params[:user][:username], password: params[:user][:password])
        @user = User.find_by_credentials(params[:session][:credential], params[:session][:password])
        if @user
            login!(@user)
            render 'api/users/show'
        else
            # @user = User.new(username: params[:user][:username])
            # flash.now[:errors] = ['Invalid username or password']
            render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
        end
  end

  def destroy
    logout!
    render json: { message: 'success' }
  end
end
