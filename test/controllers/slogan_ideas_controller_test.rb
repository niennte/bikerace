require 'test_helper'

class SloganIdeasControllerTest < ActionDispatch::IntegrationTest
  setup do
    @slogan_idea = slogan_ideas(:one)
  end

  test "should get index" do
    get slogan_ideas_url
    assert_response :success
  end

  test "should get new" do
    get new_slogan_idea_url
    assert_response :success
  end

  test "should get validate as json" do
    get validate_url, as: :json
    assert_response :success
  end

  test "should get validate as json with params" do
    get validate_url, as: :json, params: {
      idea: ''
    }
    assert_response :success
    assert_match("idea", response.parsed_body.to_s )
  end

  test "should create slogan_idea" do
    assert_difference('SloganIdea.count') do
      post slogan_ideas_url, params: { slogan_idea: { email: @slogan_idea.email, first_name: @slogan_idea.first_name, idea: @slogan_idea.idea, last_name: @slogan_idea.last_name } }
    end

    assert_redirected_to slogan_idea_url(SloganIdea.last)
  end

  test "should show slogan_idea" do
    get slogan_idea_url(@slogan_idea)
    assert_response :success
  end

  test "should get edit" do
    get edit_slogan_idea_url(@slogan_idea)
    assert_response :success
  end

  test "should update slogan_idea" do
    patch slogan_idea_url(@slogan_idea), params: { slogan_idea: { email: @slogan_idea.email, first_name: @slogan_idea.first_name, idea: @slogan_idea.idea, last_name: @slogan_idea.last_name } }
    assert_redirected_to slogan_idea_url(@slogan_idea)
  end

  test "should destroy slogan_idea" do
    assert_difference('SloganIdea.count', -1) do
      delete slogan_idea_url(@slogan_idea)
    end

    assert_redirected_to slogan_ideas_url
  end
end
