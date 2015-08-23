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

["Demo User", "Art Murray", "Kayla Kuvalis", "Kenneth Mitchell"].each do |name|
  user = User.find_by_name(name)
  user.destroy! if user
end

demo_user = User.create!(
  name: "Demo User",
  email: "demo@geoflickr.com",
  password: "password",
  avatar: file_from_url(Faker::Avatar.image),
  banner: file_from_url("https://c4.staticflickr.com/4/3904/15307929495_c605555414_h.jpg")
)

user1 = User.create!(
  name: "Art Murray",
  email: "art@murraymail.com",
  password: "password",
  avatar: file_from_url(Faker::Avatar.image),
  banner: file_from_url("https://c4.staticflickr.com/4/3904/15307929495_c605555414_h.jpg")
)

user2 = User.create!(
  name: "Kayla Kuvalis",
  email: "kayla@kuvalismail.com",
  password: "password",
  avatar: file_from_url(Faker::Avatar.image),
  banner: file_from_url("https://c4.staticflickr.com/4/3904/15307929495_c605555414_h.jpg")
)

user3 = User.create!(
  name: "Kenneth Mitchell",
  email: "kenneth@mitchellmail.com",
  password: "password",
  avatar: file_from_url(Faker::Avatar.image),
  banner: file_from_url("https://c4.staticflickr.com/4/3904/15307929495_c605555414_h.jpg")
)

users = [user1, user2, user3]


data = CSV.foreach("db/seed-data.csv", { encoding: 'ISO-8859-1', headers: true, header_converters: :symbol, converters: :all}) do |row|
  this_row = row.to_hash
  url = this_row[:url]
  image = Image.create!(image: file_from_url(url), user: users.sample, address: this_row[:address])

  tags = this_row[:tags] ? this_row[:tags].split(" ") : []
  tags.each do |tag|
    this_tag = Tag.find_by_label(tag)
    this_tag = Tag.create!({ label: tag }) unless this_tag
    Tagging.create({ image: image, tag: this_tag })
  end


  (3...15).to_a.sample.times do
    user = users.sample
    comment = user.comments.create({
      content: Faker::Lorem.sentence,
      image: image,
      created_at: Faker::Time.between(DateTime.now - 35, DateTime.now)
    })
  end
end

users.each do |user|
  image_ids = Image.all.pluck(:id)
  image_ids.sample(5 + Random.rand(image_ids.length / 2)).each do |image_id|
    Favorite.create!({ image_id: image_id, user_id: user.id })
  end
end
