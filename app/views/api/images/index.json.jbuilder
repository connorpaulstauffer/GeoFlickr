json.images do
  json.array! @images do |this_image|
    json.partial! "api/images/image", image: this_image
  end
end


json.center @center if @center

json.tags do
  json.array! @tags
end
