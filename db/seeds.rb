# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

user = User.create!(email: "user@example.com", password: "password")

data = CSV.foreach("db/seed_contents/geoflickr-image-seeds.csv", { encoding: 'ISO-8859-1', headers: true, header_converters: :symbol, converters: :all}) do |row|
  path = "db/seed_contents/geoflickr-images/" + row.to_hash[:path]
  image = File.open(path)
  Image.create!(image: image, user: user)
end
