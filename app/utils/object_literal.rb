class ObjectLiteral

  def initialize(attributes)
    attributes.each do |attribute_name, attribute_value|

      # Courtesy of https://gist.github.com/davidbella/6918455
      # Manually creates methods for both getter and setter and then
      # sends a message to the new setter with the attribute_value
      self.class.send(:define_method, "#{attribute_name}=".to_sym) do |value|
        instance_variable_set("@" + attribute_name.to_s, value)
      end

      self.class.send(:define_method, attribute_name.to_sym) do
        instance_variable_get("@" + attribute_name.to_s)
      end

      self.send("#{attribute_name}=".to_sym, attribute_value)

    end
  end

  def to_hash
    hash = {}
    instance_variables.each {|var|
      hash[var.to_s.delete("@").to_sym] = instance_variable_get(var) }
    hash
  end

end