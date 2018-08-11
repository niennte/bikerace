module PhotosHelper

  def photo_placeholder(photo)
    if photo.orientation == 'landscape'
      "//placehold.it/#{photo.width}x#{photo.height}/000"
    else
      "//placehold.it/#{photo.width}x#{photo.width}/000"
    end
  end

end
