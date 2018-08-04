class SiteController < ApplicationController

  # GET /photos
  def photos
    @photos = FlickrClient.new.fetch(page: 1)
  end

end
