class CreateContacts < ActiveRecord::Migration[7.0]
  def change
    create_table :contacts do |t|
      t.text :title
      t.text :content
      t.integer :status
      t.date :published_at
      t.date :closed_at

      t.timestamps
    end
  end
end
