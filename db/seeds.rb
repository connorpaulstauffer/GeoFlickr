# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'
require 'open-uri'

def file_from_url(url)
  extname = File.extname(url)
  basename = File.basename(url, extname)
  file = Tempfile.new([basename, extname])
  file.binmode

  open(url) do |data|
    file.write data.read
  end

  file.rewind
  file
end

user = User.find_by_email("demo@geoflickr.com")

if !user
  user = User.new(email: "demo@geoflickr.com", password: "password")

  url = "https://spiritualoasis.files.wordpress.com/2006/10/earth-from-space-western.jpg"
  user.avatar = file_from_url(url)


  url = "https://c4.staticflickr.com/4/3904/15307929495_c605555414_h.jpg"
  user.banner = file_from_url(url)

  user.save!
end

user.images.destroy_all

data = CSV.foreach("db/seed-data.csv", { encoding: 'ISO-8859-1', headers: true, header_converters: :symbol, converters: :all}) do |row|
  image = row.to_hash
  url = image[:url]
  image = Image.create!(image: file_from_url(url), user: user, address: image[:address])

  (1...10).to_a.sample.times do
    comment = user.comments.create({
      content: Faker::Lorem.sentence,
      image: image,
      user: user,
      created_at: Faker::Time.between(DateTime.now - 35, DateTime.now)
    })
  end
end
