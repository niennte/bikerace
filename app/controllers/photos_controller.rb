class PhotosController < ApplicationController

  # GET /photos-static
  def photos
    page = params[:page].to_i || 1
    page_size = params[:page_size] && params[:page_size].to_i || 40
    @flickr = FlickrClient.new.fetch(page: page, page_size: page_size)
  end

  # GET /photos
  # GET /photos.json
  def gallery
    page = params[:page] && params[:page].to_i || 20
    page_size = params[:page_size] && params[:page_size].to_i || 12
    @flickr = FlickrClient.new.fetch(page: page, page_size: page_size)
    respond_to do |format|
      format.html
      format.json do
        render json: @flickr
      end
    end
  end

end
