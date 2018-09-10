class OnepageController < ApplicationController
  layout 'onepage'
  # /
  def home

    # data for the flickr gallery
    @layout = params[:layout] && params[:layout].to_s || 'masonry'
    page = params[:page] && params[:page].to_i || 20
    page_size = params[:page_size] && params[:page_size].to_i || 12
    @flickr = FlickrClient.new.fetch(page: page, page_size: page_size)

    # data for the riders, and the map
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

    # data for the slogan idea contest
    @slogan_idea = SloganIdea.new.extend(SloganIdeaForm).result

  end

end