class Photo
  attr_reader :src, :title, :alt, :link_src

  DEFAULT_SIZE = 'z'

  def initialize(flickr, size = DEFAULT_SIZE)
    @id	= flickr['id']
    @owner = flickr['owner']
    @secret	= flickr['secret']
    @server	= flickr['server']
    @farm	= flickr['farm']
    @title	= flickr['title']
    @size = size
    @src = compose_src
    @link_src = compose_link_src
  end

  def compose_src
    "https://farm#{@farm}.staticflickr.com/#{@server}/#{@id}_#{@secret}_#{@size}.jpg"
  end

  def compose_link_src
    "https://www.flickr.com/photos/#{@owner}/#{@id}"
  end

end