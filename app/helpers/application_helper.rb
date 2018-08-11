module ApplicationHelper
  def css_active(isActive)
    isActive ? 'active' : ''
  end

  def css_disabled(isDisabled)
    isDisabled ? 'disabled' : ''
  end

end
