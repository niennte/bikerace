module RidersHelper
  
  def two_column_set(items, column = 1)
    column_set = []
    if column == 1
      column_set = items.take(items.length / 2)
    end
    if column == 2
      column_set = items.reverse.take(items.length / 2).reverse
    end
    column_set
  end

end