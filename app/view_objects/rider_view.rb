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

  def for_react
    {
        coordinates: [longitude, latitude],
        properties: {
            riderId: id,
            full_name: full_name,
            city_of_origin: city_of_origin
        }
    }
  end
end