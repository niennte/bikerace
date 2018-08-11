require 'http'

class FlickrClient

  attr_reader :collection, :page, :perpage, :total, :pages

  API_KEY = ENV['API_KEY']
  SERVICE_URI = 'https://api.flickr.com/services/rest/'

  PER_PAGE = 40

  def initialize
    @params = {
        :method => 'flickr.photos.search',
        :api_key => API_KEY,
        #:tags => nil,
        #:tag_mode => 'All',
        :text => 'Colorado Boulder Bike Race',
        :license => '4,5,6,9,10',
        :safe_search => '1',
        :format => 'json',
        :nojsoncallback => '1',
        :page => nil,
        :per_page => nil,
        :extras => 'url_' + Photo.default
    }
    @page	= nil
    @pages = nil
    @perpage = nil
    @total = 0
    @collection = []
  end

  def fetch(page: nil, per_page: PER_PAGE)
    @params[:page] = page
    @params[:per_page] = per_page
    compose_request
    @response = HTTP.get(compose_request).body
    map_response
    self
  end

  def compose_request
    @uri = URI.parse(SERVICE_URI)
    @uri.query = URI.encode_www_form(@params)
    @request = @uri.to_s
  end

  def map_response
    parsed = JSON.parse @response
    @page = parsed["photos"]["page"]
    @pages = parsed["photos"]["pages"]
    @perpage = parsed["photos"]["perpage"]
    @total = parsed["photos"]["total"]
    parsed["photos"]["photo"].each do |photo|
      @collection.push(Photo.new(photo))
    end
  end

  def has_previous_page
    @page - 1 > 0
  end

  def has_next_page
    @page + 1 <= @pages
  end

end