require 'test_helper'

class SloganIdeaTest < ActiveSupport::TestCase

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

    model = @valid_model

    @invalid[:first_name].each do |value|
      model.first_name = value
      refute model.valid?
      assert model.errors[:first_name].any?
    end

  end

  test 'is invalid unless last name valid' do

    model = @valid_model

    @invalid[:last_name].each do |value|
      model.last_name = value
      refute model.valid?
      assert model.errors[:last_name].any?
    end

  end

  test 'is invalid unless email valid' do

    model = @valid_model

    @invalid[:email].each do |value|
      model.email = value
      refute model.valid?
      assert model.errors[:email].any?
    end

  end

  test 'is invalid unless idea valid' do

    model = @valid_model

    @invalid[:idea].each do |value|
      model.idea = value
      refute model.valid?
      assert model.errors[:idea].any?
    end

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
      first_name: @valid[:first_name],
      last_name: @valid[:last_name],
      email: @valid[:email],
      idea: @valid[:idea]
    )
  end

end
