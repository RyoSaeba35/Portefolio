class DropContacts < ActiveRecord::Migration[7.2]
  def change
    drop_table :contacts
  end
end
