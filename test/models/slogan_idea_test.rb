require 'test_helper'
require 'helpers/model_helper'

class SloganIdeaTest < ActiveSupport::TestCase
  include ModelHelper

  setup do
    # Generate random values meeting validation criteria
    @valid = build_valid_fields

    # Generate random values representing edge cases
    @invalid = build_invalid_fields

    # Create reusable valid model for isolation in edge cases
    @valid_model = sample_valid_model

  end


  test 'is valid' do

    model = @valid_model
    assert model.valid?

  end

  test 'is invalid unless first name valid' do
    standard_validation :first_name
  end

  test 'is invalid unless last name valid' do
    standard_validation :last_name
  end

  test 'is invalid unless email valid' do
    standard_validation :email
  end

  test 'is invalid unless idea valid' do
    standard_validation :idea
  end

  private

  def build_valid_fields
    {
      first_name: [string_of_max(50)],
      last_name: [string_of_max(50)],
      email: [valid_email],
      idea: [string_of_max(50)]
    }
  end

  def build_invalid_fields
    {
      first_name: [
          nil,
          string_of(51)
      ],
      last_name: [
          nil,
          string_of(51)
      ],
      email: [
          nil,
          string_of(20),
          "#{string_of(5)}@#{string_of(5)}",
          "#{string_of(5)}.#{string_of(5)}",
          string_of(51),
          '#$%' + valid_email
      ],
      idea: [
          nil,
          string_of(51)
      ]
    }
  end

  def sample_valid_model
    SloganIdea.new(
      first_name: @valid[:first_name][rand(@valid[:first_name].length)],
      last_name: @valid[:last_name][rand(@valid[:first_name].length)],
      email: @valid[:email][rand(@valid[:first_name].length)],
      idea: @valid[:idea][rand(@valid[:first_name].length)]
    )
  end

end
