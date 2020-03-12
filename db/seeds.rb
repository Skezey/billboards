@genre_ids = []
@artist_ids = []
@forum_ids = []
@user_ids = []

def create_users
  User.create(
    email: 'admin@admin.com',
    name: 'Admin McAdminFace',
    password: 'password',
    role: 'admin',
    image: 'https://via.placeholder.com/150'
  )
  30.times do
    user = User.create(
      email: Faker::Internet.email,
      name: Faker::Name.first_name,
      password: 'password',
      role: 'user',
      image: 'https://via.placeholder.com/150'
    )
    @user_ids << user.id
  end
  puts '30 users created'
end

def create_genres

  10.times do
    genre = Genre.create(
      title: Faker::Music.genre
    )
    @genre_ids << genre.id
  end
  puts '10 genres created'
end

def create_artists
  50.times do |i|
    artist = Artist.create(
      name: Faker::Music.band,
      rank: i,
      genre_id: @genre_ids.sample,
      main_img: 'https://via.placeholder.com/150',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    )
    @artist_ids << artist.id
  end
  puts '50 artists created'
end

def create_songs
  year = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2018]
  100.times do
    Song.create(
      title: Faker::Music.album,
      artist_id: @artist_ids.sample,
      year: year.sample,
      album: Faker::Superhero.name
    )
  end
  puts '100 songs created'
end

def create_forums
  20.times do
    forum = Forum.create(
      title: Faker::GreekPhilosophers.quote,
      body: Faker::Lorem.sentence
    )
    create_posts(forum.id)
  end
  puts '20 forums created'
end

def create_posts(forum_id)
  20.times do
    Post.create(
      body: Faker::Lorem.sentence,
      user_id: @user_ids.sample,
      forum_id: forum_id
    )
  end
end

create_genres
create_artists
create_songs
create_users
create_forums
