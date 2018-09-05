require 'http'

# Deal with calling flickr service
# - Calculate pagination
# - Map response to collection
# - Return nil if the call fails

class FlickrClient

  attr_accessor :params, :service
  attr_reader :collection, :page, :page_size, :total, :pages

  API_KEY = ENV['API_KEY']
  SERVICE_URI = 'https://api.flickr.com/services/rest/'

  DEFAULT_PAGE_SIZE = 40
  DEFAULT_PAGINATOR_RANGE = 5

  def initialize
    @service = SERVICE_URI
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
    @page_size = nil
    @total = 0
    @collection = []
  end

  def fetch(page: nil, page_size: DEFAULT_PAGE_SIZE)
    @params[:page] = page
    @params[:per_page] = page_size
    compose_request
    call_service
    map_response
  end

  def call_service
    begin
      @response = JSON.parse HTTP.get(@request)
    rescue
      nil
    end
  end

  def compose_request
    @uri = URI.parse(@service)
    @uri.query = URI.encode_www_form(@params)
    @request = @uri.to_s
  end

  def map_response
    begin
    @page = @response["photos"]["page"]
    @pages = @response["photos"]["pages"]
    @page_size = @response["photos"]["perpage"]
    @total = @response["photos"]["total"]
    @response["photos"]["photo"].each do |photo|
      @collection.push(Photo.new(photo).result )
    end
      result
    rescue
      nil
    end
  end

  def has_previous_page
    @page - 1 > 0
  end

  def has_next_page
    @page + 1 <= @pages
  end

  # place active page in the middle of the specified range,
  # account for beginning and end
  def paginator(paginator_range: DEFAULT_PAGINATOR_RANGE)
    range = (1..paginator_range)
    if (@page - paginator_range / 2) > 0 && (@page + paginator_range / 2) <= @pages
      range = ((@page - paginator_range / 2)..(@page + paginator_range / 2))
    elsif (@page - (paginator_range / 2)) > 0 && @page + paginator_range >= @pages
      range = ((@pages - (paginator_range - 1))..@pages)
    end
    range.to_a
  end
  
  def result
    ObjectLiteral.new(
      :collection => @collection,
      :page => @page,
      :page_size => @page_size,
      :total => @total,
      :pages => @pages,
      :has_next_page => has_next_page,
      :has_previous_page => has_previous_page,
      :paginator => paginator,
      :terms => @params[:text].split(" ")
  )
  end

end