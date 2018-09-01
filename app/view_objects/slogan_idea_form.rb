module SloganIdeaForm
  def labels
    {
        first_name: 'First name',
        last_name: 'Last name',
        email: 'Email address',
        idea: 'Idea for the slogan'
    }
  end

  def expected_fields
    [:first_name, :last_name, :email, :idea]
  end

  def result
    ObjectLiteral.new(
        :first_name => first_name,
        :last_name => last_name,
        :email => email,
        :idea => idea,
        :labels=> labels,
        :expected_fields=> expected_fields
    )
  end

end