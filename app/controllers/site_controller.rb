class SiteController < ApplicationController

  # GET /photos
  def photos
    page = params[:page].to_i || 1
    @photos = FlickrClient.new.fetch(page: page)
  end

  # GET /gallery
  def gallery
    page = params[:page].to_i || 1
    @photos = FlickrClient.new.fetch(page: page)
  end

end
