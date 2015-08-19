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
user.destroy!
user = User.new(email: "demo@geoflickr.com", password: "password")

url = "https://spiritualoasis.files.wordpress.com/2006/10/earth-from-space-western.jpg"
user.avatar = file_from_url(url)

url = "https://c4.staticflickr.com/4/3904/15307929495_c605555414_h.jpg"
user.banner = file_from_url(url)

user.save!


data = CSV.foreach("db/seed-data.csv", { encoding: 'ISO-8859-1', headers: true, header_converters: :symbol, converters: :all}) do |row|
  this_row = row.to_hash
  url = this_row[:url]
  image = Image.create!(image: file_from_url(url), user: user, address: this_row[:address])

  tags = this_row[:tags] ? this_row[:tags].split(" ") : []
  tags.each do |tag|
    this_tag = Tag.find_by_label(tag)
    this_tag = Tag.create!({ label: tag }) unless this_tag
    Tagging.create({ image: image, tag: this_tag })
  end


  (1...10).to_a.sample.times do
    comment = user.comments.create({
      content: Faker::Lorem.sentence,
      image: image,
      user: user,
      created_at: Faker::Time.between(DateTime.now - 35, DateTime.now)
    })
  end
end
