class MakeProjectUserIdOptional < ActiveRecord::Migration[6.0]
  def change
    change_column_null(:projects, :user_id, true)
  end
end
