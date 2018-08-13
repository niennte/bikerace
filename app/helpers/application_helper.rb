module ApplicationHelper
  def css_active(isActive)
    isActive ? 'active' : ''
  end

  def css_disabled(isDisabled)
    isDisabled ? 'disabled' : ''
  end

  def css_warning(hasAlert)
    hasAlert ? 'alert alert-warning' : ''
  end

  def css_success(hasAlert)
    hasAlert ? 'alert alert-success' : ''
  end

  def css_danger(hasAlert)
    hasAlert ? 'alert alert-danger' : ''
  end

  def css_crud
    'd-flex justify-content-center'
  end

end
