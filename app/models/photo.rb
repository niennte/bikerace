class Photo
  attr_reader :src, :title, :link_src, :height, :width, :orientation

  DEFAULT_SIZE = 'z'

  def initialize(flickr, size = DEFAULT_SIZE)
    set_spec(flickr)
    @spec[:size] = size
    @title = flickr['title']
    @src = compose_src
    @link_src = compose_link_src
    @height = flickr['height_' + size]
    @width = flickr['width_' + size]
    set_orientation
  end

  def self.default
    DEFAULT_SIZE
  end

  def set_spec(flickr)
    @spec = {
      :id	=> flickr['id'],
      :owner => flickr['owner'],
      :secret	=> flickr['secret'],
      :server	=> flickr['server'],
      :farm	=> flickr['farm']
    }
  end

  def set_orientation
    @orientation = @height > @width ? 'portrait' : 'landscape'
  end

  def compose_src
    "https://farm#{@spec[:farm]}.staticflickr.com/#{@spec[:server]}/#{@spec[:id]}_#{@spec[:secret]}_#{@spec[:size]}.jpg"
  end

  def compose_link_src
    "https://www.flickr.com/photos/#{@spec[:owner]}/#{@spec[:id]}"
  end

  def result
    ObjectLiteral.new(
      :src => @src,
      :title => @title,
      :link_src => @link_src,
      :height => @height,
      :width => @width,
      :orientation => @orientation
    )
  end

end