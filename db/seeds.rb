
require_relative "easy_seeds.rb"
require "open-uri"

# ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Trail.destroy_all
    Park.destroy_all
    User.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('parks')
    ApplicationRecord.connection.reset_pk_sequence!('trails')

    # puts "Creating users..."
    # # Create one user with an easy to remember username, email, and password:
    # User.create!(
    # first_name: 'Demo',
    # last_name:'Lition', 
    # email: 'demo@user.io', 
    # password: 'password'
    # )

    # # More users
    # 10.times do 
    # User.create!({
    #     first_name: Faker::Internet.unique.username(specifier: 3),
    #     last_name: Faker::Internet.unique.username(specifier: 3),
    #     email: Faker::Internet.unique.email,
    #     password: 'password'
    # }) 
    # end

    
    class_names = [User, Park, Trail]
    # table_strings = ['users', 'parks', 'trails']
    # EasySeeds.destroy_tables(class_names, table_strings)
    EasySeeds.create_easy_seed_data(class_names)

    class_image_names = [Park, Trail]
    EasySeeds.attach_images(class_image_names)

    puts "Done!"
# end
