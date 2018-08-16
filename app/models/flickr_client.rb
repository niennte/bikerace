require 'http'

class FlickrClient

  attr_reader :collection, :page, :perpage, :total, :pages

  API_KEY = ENV['API_KEY']
  SERVICE_URI = 'https://api.flickr.com/services/rest/'

  PER_PAGE = 40
  PAGINATOR_RANGE = 5

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
    call_service
    map_response
    result
  end

  def call_service
    @response = JSON.parse HTTP.get(@request)
  end

  def compose_request
    @uri = URI.parse(SERVICE_URI)
    @uri.query = URI.encode_www_form(@params)
    @request = @uri.to_s
  end

  def map_response
    @page = @response["photos"]["page"]
    @pages = @response["photos"]["pages"]
    @perpage = @response["photos"]["perpage"]
    @total = @response["photos"]["total"]
    @response["photos"]["photo"].each do |photo|
      @collection.push(Photo.new(photo).result )
    end
  end

  def has_previous_page
    @page - 1 > 0
  end

  def has_next_page
    @page + 1 <= @pages
  end

  def paginator
    range = (1..PAGINATOR_RANGE)
    if (@page - PAGINATOR_RANGE / 2) > 0 && (@page + PAGINATOR_RANGE / 2) <= @pages
      range = ((@page - PAGINATOR_RANGE / 2)..(@page + PAGINATOR_RANGE / 2))
    elsif (@page - (PAGINATOR_RANGE / 2)) > 0 && @page + PAGINATOR_RANGE >= @pages
      range = ((@pages - (PAGINATOR_RANGE - 1))..@pages)
    end
    range.to_a
  end
  
  def result
    ObjectLiteral.new(
      :collection => @collection,
      :page => @page,
      :perpage => @perpage,
      :total => @total,
      :pages => @pages,
      :has_next_page => has_next_page,
      :has_previous_page => has_previous_page,
      :paginator => paginator
  )
  end

end