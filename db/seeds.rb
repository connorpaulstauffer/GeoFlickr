# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'
require 'open-uri'

user = User.find_by_email("demo@geoflickr.com")

if !user
  user = User.new(email: "demo@geoflickr.com", password: "password")

  url = "https://spiritualoasis.files.wordpress.com/2006/10/earth-from-space-western.jpg"

  extname = File.extname(url)
  basename = File.basename(url, extname)
  avatar = Tempfile.new([basename, extname])
  avatar.binmode

  open(url) do |data|
    avatar.write data.read
  end
  avatar.rewind

  user.avatar = avatar


  url = "https://c4.staticflickr.com/4/3904/15307929495_c605555414_h.jpg"

  extname = File.extname(url)
  basename = File.basename(url, extname)
  banner = Tempfile.new([basename, extname])
  banner.binmode

  open(url) do |data|
    banner.write data.read
  end
  banner.rewind

  user.banner = banner

  user.save!
end

user.images.destroy_all

data = CSV.foreach("db/seed-data.csv", { encoding: 'ISO-8859-1', headers: true, header_converters: :symbol, converters: :all}) do |row|
  image = row.to_hash
  url = image[:url]

  extname = File.extname(url)
  basename = File.basename(url, extname)
  file = Tempfile.new([basename, extname])
  file.binmode

  open(url) do |data|
    file.write data.read
  end

  file.rewind
  Image.create!(image: file, user: user, address: image[:address])
end
