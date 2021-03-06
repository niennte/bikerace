class RidersController < ApplicationController
  before_action :set_rider, only: [:show, :edit, :update, :destroy]

  # GET /riders
  # GET /riders.json
  def index
    @riders = Rider.all.order('id').map do |rider|
      rider.extend(RiderView).for_react
    end
    respond_to do |format|
      format.html
      format.json { render json: @riders }
    end
  end

  # GET /list
  # GET /list.json
  def list
    @riders = Rider.all.order('id')
  end

  # GET /riders-static
  # GET /riders-static.json
  def static
    @riders = Rider.all.order('id')
  end

  # GET /location
  # GET /location.json
  def map
    @riders = Rider.all.order('id').map do |rider|
      rider.extend(RiderView).for_react
    end
    respond_to do |format|
      format.html
      format.json { render json: @riders }
    end
  end


  # GET /location-static
  # GET /location-static.json
  def location
    @show_simulator = Rails.env.development?
    @pn_creds = {
        publish_key: ENV['PN_PUB_KEY'],
        subscribe_key: ENV['PN_SUB_KEY']
    }

    @riders = Rider.all.order('id').map do |rider|
      rider.extend(RiderView).for_react
    end
  end

  def real_time_updates
    @show_simulator = Rails.env.development?
    @pn_creds = {
        publish_key: ENV['PN_PUB_KEY'],
        subscribe_key: ENV['PN_SUB_KEY']
    }

    @riders = Rider.all.order('id').map do |rider|
      rider.extend(RiderView).for_react
    end
    respond_to do |format|
      format.html
      format.json { render json: @riders }
    end
  end

  # GET /riders/1
  # GET /riders/1.json
  def show
  end

  # GET /riders/new
  def new
    @rider = Rider.new
  end

  # GET /riders/1/edit
  def edit
  end

  # POST /riders
  # POST /riders.json
  def create
    @rider = Rider.new(rider_params)

    respond_to do |format|
      if @rider.save
        format.html { redirect_to @rider, notice: 'Rider was successfully created.' }
        format.json { render :show, status: :created, location: @rider }
      else
        format.html { render :new }
        format.json { render json: @rider.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /riders/1
  # PATCH/PUT /riders/1.json
  def update
    respond_to do |format|
      if @rider.update(rider_params)
        format.html { redirect_to @rider, notice: 'Rider was successfully updated.' }
        format.json { render :show, status: :ok, location: @rider }
      else
        format.html { render :edit }
        format.json { render json: @rider.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /riders/1
  # DELETE /riders/1.json
  def destroy
    @rider.destroy
    respond_to do |format|
      format.html { redirect_to riders_url, notice: 'Rider was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_rider
      @rider = Rider.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def rider_params
      params.require(:rider).permit(:first_name, :last_name, :city, :state, :latitude, :longitude)
    end
end
