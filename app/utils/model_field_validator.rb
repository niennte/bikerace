# temporary ability to validate a partial set of fields
module ValidateFields
  def validate_fields(*attributes)
    attributes.each do |attribute|
      self.class.validators_on(attribute).each do |validator|
        validator.validate_each(self, attribute, send(attribute))
      end
    end
    errors.messages
  end
end

# empty error hash - all fields valid
# error hash with errors - not surprisingly, validation errors
# nil - model not valid or has no requested fields
class ModelFieldValidator
  def self.validate(model_class, model_fields)
    begin
    # instantiate model with fields, extend with validator method, and call model validators on fields
    model_class
      .constantize
      .new(model_fields)
      .extend(ValidateFields)
      .validate_fields(*model_fields.keys)
    rescue
      nil
    end
  end
end
