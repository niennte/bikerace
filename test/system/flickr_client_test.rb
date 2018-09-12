require 'test_helper'

class FlickrClientTest < ActiveSupport::TestCase

  test 'handles service authorization failure' do
    flickr = FlickrClient.new
    flickr.params[:api_key] = 'key causing service to reject call'
    result = flickr.fetch(page: 1, page_size: 1)
    assert result.nil?
  end

  test 'handles method unavailable' do
    flickr = FlickrClient.new
    flickr.params[:method] = 'unavailable'
    result = flickr.fetch(page: 1, page_size: 1)
    assert result.nil?
  end

  test 'handles service unavailable' do
    flickr = FlickrClient.new
    flickr.service = 'unavailable'
    result = flickr.fetch(page: 1, page_size: 1)
    assert result.nil?
  end

end