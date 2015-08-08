# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## images
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
title          | string    | not null
description    | text      |
filepicker_url | text      | not null
latitude       | integer   | not null, index
longitude      | integer   | not null, index
address        | string    |

## albums
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
title       | string    | not null
description | text      |

## album_inclusions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
image_id    | integer   | not null, foreign key (references images)
album_id    | integer   | not null, foreign key (references albums)

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
image_id    | integer   | not null, foreign key (references images)
tag_id      | integer   | not null, foreign key (references tags)

## favorites
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
image_id    | integer   | not null, foreign key (references images)
user_id     | integer   | not null, foreign key (references users)

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
image_id    | integer   | not null, foreign key (references images)
content     | text      | not null
