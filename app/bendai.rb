require "rubygems"
require "sinatra"
require "haml"
require "mongo_mapper"
require "json"
require "models/user.rb"

set :haml, {:attr_wrapper => '"'}

MongoMapper.database = 'testdb'

# Define some route wrappers

def json_post(route, options={}, &block)
  post(route, options) do
    content_type :json
    instance_eval(&block).to_json
  end
end

def json_get(route, options={}, &block)
  get(route, options) do
    content_type :json
    instance_eval(&block).to_json
  end
end

# Routes
# -------------------------------

# Main game entry point.
get '/' do
  @logged_in = authorized?
  @scripts = Array.new
  @scripts << '/js/extra/jquery.gritter.min.js'
  @scripts << '/js/extra/jquery.ba-dotimeout.min.js'
  @scripts << '/js/extra/jquery.form.js'
  @scripts << '/js/extra/jquery.blockUI.js'
  @scripts << '/js/jquery.wiggle.js'
  @scripts << '/js/bendai.js'
  @scripts << '/js/user.js'
	@scripts << '/js/world.js'
	@scripts << '/js/player.js'
	@scripts << '/js/party.js'
	@scripts << '/js/chat.js'
	@scripts << '/js/modal.js'
  haml :index
end

# Send login form
get '/game/ui/login' do partial(:login, {}, true) end

# Authenticate the user
json_post '/game/user/auth' do
  u = User.first(:email => params['email'])
  if u then
    if u.check_password(params['pwd']) then
      u.session_id = User.gen_salt
      u.session_start = Time.now.to_s
      u.save()
      set_user_session(u.session_id)
      form_ok 'User logged in!', u.to_hash
    else
      form_fail 'Validation failed.', false
    end
  else
    user = User.create({})
    user.email = params['email']
    user.session_id = User.gen_salt
    user.session_start = Time.now.to_s
    user.set_password(params['pwd'])
    user.save()
    set_user_session(user.session_id)
    form_ok 'User created for ' + params['email'] + '!', user.to_hash
  end
end

# Send the game chooser form
get '/game/ui/choose-game' do partial :choosegame end

# Load a game
json_post '/game/world/load' do
  protect!
  form_fail 'Could not locate game.'
end

# Send the new character form
get '/game/ui/create-character' do partial :createchar end

# Create a new character and join it to a (new) game
json_post '/game/player/create' do
  protect!
  form_fail 'Could not create or save character'
end

load "helper.rb"
    