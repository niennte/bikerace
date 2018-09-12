require 'test_helper'
require 'helpers/model_helper'

class ModelFieldValidatorTest < ActiveSupport::TestCase
  include ModelHelper

  setup do
    # Generate random values meeting validation criteria
    @valid = build_valid_fields

    # Generate random values representing edge cases
    @invalid = build_invalid_fields

  end


  test 'validates valid fields' do

    model_class = 'SloganIdea'
    result = ModelFieldValidator.validate(model_class, @valid)
    assert result.length.zero?

  end

  test 'validates invalid fields' do

    model_class = 'SloganIdea'
    result = ModelFieldValidator.validate(model_class, @invalid)
    assert result.length == @invalid.length

  end

  test 'validates single field' do

    model_class = 'SloganIdea'
    result = ModelFieldValidator.validate(model_class, email: @invalid[:email])
    assert result.length == 1

  end

  test 'yields accurate errors' do

    model_class = 'SloganIdea'
    result = ModelFieldValidator.validate(model_class, email: @invalid[:email])
    assert result.length == 1
    assert_not_empty result[:email]

  end

  private

  def build_valid_fields
    {
      first_name: string_of_max(50),
      last_name: string_of_max(50),
      email: valid_email,
      idea: string_of_max(50)
    }
  end

  def build_invalid_fields
    {
      first_name: nil,
      last_name: nil,
      email: nil,
      idea: nil
    }
  end

end
