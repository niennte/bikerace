module RiderView
  def full_name
    "#{first_name} #{last_name}"
  end

  def city_of_origin
    "#{city}, #{state}"
  end

  def current_location
    "Lat: #{latitude}, lon: #{longitude}"
  end
end