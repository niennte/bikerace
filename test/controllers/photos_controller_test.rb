require 'test_helper'

class PhotosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @flickr = nil
  end

  test "should get index" do
    get photos_url
    assert_response :success
  end


end
