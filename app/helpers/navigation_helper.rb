module NavigationHelper

  def welcome_page?
    controller_name == 'site' && action_name == 'index'
  end

  def photos_page?
    controller_name == 'site' && (action_name == 'photos' || action_name == 'gallery')
  end

  def riders_page?
    controller_name == 'riders' && action_name != 'location'
  end

  def location_page?
    controller_name == 'riders' && action_name == 'location'
  end

  def contest_page?
    controller_name == 'slogan_ideas'
  end
end