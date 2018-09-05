require 'test_helper'

class RiderTest < ActiveSupport::TestCase

  setup do
    # Generate random values meeting validation criteria
    @valid = build_valid_fields

    # Generate random values representing edge cases
    @invalid = build_invalid_fields

    # Create reusable valid model for isolation in edge cases
    @valid_model = make_a_valid_model

  end


  test 'is valid' do

    rider = @valid_model
    assert rider.valid?

  end

  test 'is invalid unless first name valid' do

    rider = @valid_model

    @invalid[:first_name].each do |value|
      rider.first_name = value
      refute rider.valid?
      assert rider.errors[:first_name].any?
    end

  end

  test 'is invalid unless last name valid' do

    rider = @valid_model

    @invalid[:last_name].each do |value|
      rider.last_name = value
      refute rider.valid?
      assert rider.errors[:last_name].any?
    end

  end

  test 'is invalid unless city valid' do

    rider = @valid_model

    @invalid[:city].each do |value|
      rider.city = value
      refute rider.valid?
      assert rider.errors[:city].any?
    end

  end

  test 'is invalid unless state valid' do

    rider = @valid_model

    @invalid[:state].each do |value|
      rider.state = value
      refute rider.valid?
      assert rider.errors[:state].any?
    end

  end

  test 'is invalid unless latitude valid' do

    rider = @valid_model

    @invalid[:latitude].each do |value|
      rider.latitude = value
      refute rider.valid?
      assert rider.errors[:latitude].any?
    end

  end

  test 'is invalid unless longitude valid' do

    rider = @valid_model

    @invalid[:longitude].each do |value|
      rider.longitude = value
      refute rider.valid?
      assert rider.errors[:longitude].any?
    end

  end

  private

  def build_valid_fields
    {
      first_name: string_of_max(50),
      last_name: string_of_max(50),
      city: string_of_max(50),
      state: string_of_max(2),
      latitude: '1',
      longitude: '1'
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
      city: [
        nil,
        string_of(51)
      ],
      state: [
        nil,
        string_of(3)
      ],
      latitude: [
        true,
        string_of_max(10)
      ],
      longitude: [
        true,
        string_of_max(10)
      ]
    }
  end

  def make_a_valid_model
    Rider.new(
      first_name: @valid[:first_name],
      last_name: @valid[:last_name],
      city: @valid[:city],
      state: @valid[:state],
      latitude: '1',
      longitude: '1'
    )
  end


end
