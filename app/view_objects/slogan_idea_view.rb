module SloganIdeaView
  def label
    'Slogan Idea'
  end
  def author
    "#{last_name}, #{first_name}"
  end
  def contact
    "#{email}"
  end
  def labels
    {
        first_name: 'First name',
        last_name: 'Last name',
        email: 'Email address',
        idea: 'Idea for the slogan'
    }
  end

  def result
    ObjectLiteral.new(
        :idea => idea,
        :label => label,
        :author => author,
        :contact => contact
    )
  end

end