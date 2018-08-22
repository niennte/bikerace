class SiteController < ApplicationController
  layout 'kitchensink'


  def kitchensink
    @riders = Rider.all
    @locations = @riders.map do |rider|
      rider.extend(RiderView)
      {
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [rider.longitude, rider.latitude]
          },
          properties: {
              id: rider.id,
              popupContent: render_to_string(partial: 'riders/rider.html', locals: { rider: rider })
          },
      }
    end

    @slogan_idea = SloganIdea.new

    page = params[:page].to_i || 1
    page_size = params[:page_size] && params[:page_size].to_i || 6
    @flickr = FlickrClient.new.fetch(page: page, page_size: page_size)
    respond_to do |format|
      format.html
      format.json do
        render json: @flickr
      end
    end

  end
end
