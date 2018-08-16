class PhotosController < ApplicationController

  # GET /photos-static
  def photos
    page = params[:page].to_i || 1
    @flickr = FlickrClient.new.fetch(page: page)
  end

  # GET /photos
  def gallery
    page = params[:page].to_i || 1
    perpage = params[:perpage] && params[:perpage].to_i || 40
    @flickr = FlickrClient.new.fetch(page: page, per_page: perpage)
  end

end
