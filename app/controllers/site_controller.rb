class SiteController < ApplicationController

  # GET /photos
  def photos
    page = params[:page].to_i || 1
    @photos = FlickrClient.new.fetch(page: page)
  end

  # GET /gallery
  def gallery
    page = params[:page].to_i || 1
    perpage = params[:perpage] && params[:perpage].to_i || 40
    @photos = FlickrClient.new.fetch_json(page: page, per_page: perpage)
  end

end
