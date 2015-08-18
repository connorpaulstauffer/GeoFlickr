json.(comment, :id, :content)

json.user do
  json.partial! comment.user, partial: "api/users/user", as: :user
end

json.created_at_ago time_ago_in_words(comment.created_at) + " ago"
