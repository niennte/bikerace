# frozen_string_literal: true

class PhotosController < ApplicationController
  layout "photos"

  def index
    @photos_props = { name: "Stranger" }
  end
end
