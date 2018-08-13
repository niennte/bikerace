require "application_system_test_case"

class SloganIdeasTest < ApplicationSystemTestCase
  setup do
    @slogan_idea = slogan_ideas(:one)
  end

  test "visiting the index" do
    visit slogan_ideas_url
    assert_selector "h1", text: "Slogan Ideas"
  end

  test "creating a Slogan idea" do
    visit slogan_ideas_url
    click_on "New Slogan Idea"

    fill_in "Email", with: @slogan_idea.email
    fill_in "First Name", with: @slogan_idea.first_name
    fill_in "Idea", with: @slogan_idea.idea
    fill_in "Last Name", with: @slogan_idea.last_name
    click_on "Create Slogan idea"

    assert_text "Slogan idea was successfully created"
    click_on "Back"
  end

  test "updating a Slogan idea" do
    visit slogan_ideas_url
    click_on "Edit", match: :first

    fill_in "Email", with: @slogan_idea.email
    fill_in "First Name", with: @slogan_idea.first_name
    fill_in "Idea", with: @slogan_idea.idea
    fill_in "Last Name", with: @slogan_idea.last_name
    click_on "Update Slogan idea"

    assert_text "Slogan idea was successfully updated"
    click_on "Back"
  end

  test "destroying a Slogan idea" do
    visit slogan_ideas_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Slogan idea was successfully destroyed"
  end
end
