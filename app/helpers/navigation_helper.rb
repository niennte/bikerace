module NavigationHelper

  def welcome_page?
    controller_name == 'site' && action_name == 'index'
  end

  def photos_page?
    controller_name == 'photos'
  end

  def riders_page?
    controller_name == 'riders' && action_name != 'location' && action_name != 'map'
  end

  def location_page?
    (controller_name == 'riders' && action_name == 'location') || (controller_name == 'riders' && action_name == 'map')
  end

  def contest_page?
    controller_name == 'slogan_ideas'
  end
end